'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function NewUniversityPage() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        country: '',
        city: '',
        cost_description: '',
        ielts_score: 6.0,
        flag_emoji: '',
        scholarship_info: '',
        image_url: '',
        website: '',
        description: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => {
            const newData = { ...prev, [name]: value }

            // Auto-generate slug from name if slug hasn't been manually edited
            if (name === 'name' && !prev.slug) {
                newData.slug = value.toLowerCase()
                    .replace(/[^\w\s-]/g, '') // Remove special chars
                    .replace(/\s+/g, '-') // Replace spaces with hyphens
            }

            return newData
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error('Not authenticated')

            // Check admin role
            const { data: profile } = await supabase
                .from('users')
                .select('role')
                .eq('id', user.id)
                .single()

            if (profile?.role !== 'admin') throw new Error('Unauthorized')

            // Prepare data
            const universityData = {
                name: formData.name,
                slug: formData.slug,
                country: formData.country,
                city: formData.city,
                cost_description: formData.cost_description,
                ielts_score: Number(formData.ielts_score),
                flag_emoji: formData.flag_emoji || '🏳️',
                scholarship_info: formData.scholarship_info || null,
                image_url: formData.image_url || null,
                details_json: {
                    website: formData.website,
                    description: formData.description
                }
            }

            const { error } = await supabase
                .from('universities')
                .insert(universityData)

            if (error) throw error

            router.push('/admin')
            router.refresh()
        } catch (error) {
            console.error('Error creating university:', error)
            alert('Ошибка при создании университета. Проверьте консоль.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-8 pb-12">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold">Добавить университет</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">

                    {/* Basic Info */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-blue-400 border-b border-white/10 pb-2">Основная информация</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Название вуза *</label>
                                <input
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                                    placeholder="Harvard University"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Slug (URL) *</label>
                                <input
                                    required
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors font-mono text-sm"
                                    placeholder="harvard-university"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Страна *</label>
                                <input
                                    required
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                                    placeholder="США"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Город *</label>
                                <input
                                    required
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                                    placeholder="Кембридж"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Флаг (Emoji)</label>
                                <input
                                    name="flag_emoji"
                                    value={formData.flag_emoji}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors text-center text-2xl"
                                    placeholder="🇺🇸"
                                />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm text-gray-400">Ссылка на фото (URL)</label>
                                <input
                                    name="image_url"
                                    value={formData.image_url}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Admission Info */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-green-400 border-b border-white/10 pb-2">Поступление</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Стоимость (описание) *</label>
                                <input
                                    required
                                    name="cost_description"
                                    value={formData.cost_description}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                                    placeholder="от $50,000 / год"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Мин. IELTS *</label>
                                <input
                                    required
                                    type="number"
                                    step="0.5"
                                    name="ielts_score"
                                    value={formData.ielts_score}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                                    placeholder="6.5"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Информация о грантах</label>
                            <input
                                name="scholarship_info"
                                value={formData.scholarship_info}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                                placeholder="Need-based financial aid available"
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-purple-400 border-b border-white/10 pb-2">Детали</h2>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Веб-сайт</label>
                            <input
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                                placeholder="https://harvard.edu"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Описание</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors resize-none"
                                placeholder="Краткое описание университета..."
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
                            Сохранить университет
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}
