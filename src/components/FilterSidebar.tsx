'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function FilterSidebar() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [filters, setFilters] = useState({
        country: searchParams.get('country') || '',
        budget: searchParams.get('budget') || '',
        ielts: searchParams.get('ielts') || '',
    })

    useEffect(() => {
        const params = new URLSearchParams()
        if (filters.country) params.set('country', filters.country)
        if (filters.budget) params.set('budget', filters.budget)
        if (filters.ielts) params.set('ielts', filters.ielts)

        router.push(`?${params.toString()}`)
    }, [filters, router])

    return (
        <div className="sticky top-24 h-fit bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                Фильтры
            </h3>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Страна</label>
                    <select
                        value={filters.country}
                        onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 text-white rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 transition-all hover:border-white/20"
                    >
                        <option value="" className="bg-gray-900">Все страны</option>
                        <option value="Турция" className="bg-gray-900">🇹🇷 Турция</option>
                        <option value="Чехия" className="bg-gray-900">🇨🇿 Чехия</option>
                        <option value="Польша" className="bg-gray-900">🇵🇱 Польша</option>
                        <option value="Венгрия" className="bg-gray-900">🇭🇺 Венгрия</option>
                        <option value="Италия" className="bg-gray-900">🇮🇹 Италия</option>
                        <option value="Германия" className="bg-gray-900">🇩🇪 Германия</option>
                        <option value="США" className="bg-gray-900">🇺🇸 США</option>
                        <option value="Великобритания" className="bg-gray-900">🇬🇧 Великобритания</option>
                        <option value="Южная Корея" className="bg-gray-900">🇰🇷 Южная Корея</option>
                        <option value="Китай" className="bg-gray-900">🇨🇳 Китай</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Бюджет</label>
                    <select
                        value={filters.budget}
                        onChange={(e) => setFilters({ ...filters, budget: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 text-white rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 transition-all hover:border-white/20"
                    >
                        <option value="" className="bg-gray-900">Любой</option>
                        <option value="free" className="bg-gray-900">💰 Бесплатно / Грант</option>
                        <option value="low" className="bg-gray-900">💵 До 1 млн тг</option>
                        <option value="medium" className="bg-gray-900">💶 До 2 млн тг</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">IELTS</label>
                    <select
                        value={filters.ielts}
                        onChange={(e) => setFilters({ ...filters, ielts: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 text-white rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 py-3 px-4 transition-all hover:border-white/20"
                    >
                        <option value="" className="bg-gray-900">Любой</option>
                        <option value="5.5" className="bg-gray-900">5.5+</option>
                        <option value="6.0" className="bg-gray-900">6.0+</option>
                        <option value="6.5" className="bg-gray-900">6.5+</option>
                        <option value="7.0" className="bg-gray-900">7.0+</option>
                    </select>
                </div>

                <button
                    onClick={() => setFilters({ country: '', budget: '', ielts: '' })}
                    className="w-full py-3 text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/30 rounded-xl transition-all hover:bg-white/5"
                >
                    Сбросить фильтры
                </button>
            </div>
        </div>
    )
}
