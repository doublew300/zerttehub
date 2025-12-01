'use client'

import { useState, useEffect } from 'react'
import { FileText, Lock, Download, Loader2, CheckCircle, GraduationCap, Plane, BookOpen, Search, Flame, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

import { Resource } from '@/types'

const CATEGORIES = ['Все', 'Бесплатно', 'Документы', 'Виза', 'Гранты', 'IELTS']

export default function ChecklistsPage() {
    const [resources, setResources] = useState<Resource[]>([])
    const [activeCategory, setActiveCategory] = useState('Все')
    const [searchQuery, setSearchQuery] = useState('')
    const [isPremium, setIsPremium] = useState(false)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch User
                const { data: { user } } = await supabase.auth.getUser()
                if (user) {
                    const { data: profile } = await supabase
                        .from('users')
                        .select('is_premium')
                        .eq('id', user.id)
                        .single()
                    if (profile?.is_premium) setIsPremium(true)
                }

                // Fetch Resources
                const { data: resourcesData, error } = await supabase
                    .from('resources')
                    .select('*')
                    .order('is_new', { ascending: false })

                if (error) throw error
                setResources(resourcesData as Resource[] || [])

            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [supabase])

    // Filter resources
    const filteredResources = resources.filter(r => {
        const matchesCategory = activeCategory === 'Все' ||
            (activeCategory === 'Бесплатно' ? r.is_free : r.type === activeCategory)
        const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
    })

    // Handle Download
    const handleDownload = async (resource: Resource) => {
        try {
            let downloadUrl = resource.file_url

            if (!downloadUrl || downloadUrl === '#') {
                alert('Файл еще не загружен для этого материала.')
                return
            }

            // If it's not an external link (doesn't start with http), treat as storage path
            if (!downloadUrl.startsWith('http')) {
                const { data, error } = await supabase.storage
                    .from('resources')
                    .createSignedUrl(downloadUrl, 60) // Valid for 60 seconds

                if (error) throw error
                downloadUrl = data.signedUrl
            }

            // Trigger download
            const link = document.createElement('a')
            link.href = downloadUrl
            link.target = '_blank'
            link.download = resource.title
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            // Optional: Increment download count
            await supabase.rpc('increment_downloads', { resource_id: resource.id })

        } catch (error: unknown) {
            console.error('Download error:', error)
            const errorMessage = error instanceof Error ? error.message : 'Unknown error'
            alert(`Ошибка: ${errorMessage}. Путь: ${resource.file_url}`)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        )
    }

    // Split resources
    const freeResources = filteredResources.filter(r => r.is_free)
    const premiumResources = filteredResources.filter(r => !r.is_free)

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black z-0"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">

                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white">
                        Библиотека <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Знаний</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
                        Эксклюзивные материалы, которые сэкономят вам <span className="text-green-400 font-bold">$2000</span> на консультантах.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto mb-8 relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-11 pr-4 py-3 bg-white/10 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Поиск материалов..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                    ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                    : cat === 'Бесплатно'
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Free Resources Section */}
                {freeResources.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="bg-green-500/20 text-green-400 p-2 rounded-lg"><CheckCircle className="w-5 h-5" /></span>
                            Бесплатные материалы
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {freeResources.map((item) => (
                                <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-green-500/30 hover:border-green-500/50 transition-all duration-300 bg-slate-900/60 backdrop-blur-xl p-6">
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none"></div>

                                    {/* Card Top */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-500/10 text-green-400">
                                            {item.type === 'Документы' && <FileText className="w-6 h-6" />}
                                            {item.type === 'Виза' && <Plane className="w-6 h-6" />}
                                            {item.type === 'Гранты' && <CheckCircle className="w-6 h-6" />}
                                            {item.type === 'IELTS' && <GraduationCap className="w-6 h-6" />}
                                            {item.type === 'Другое' && <BookOpen className="w-6 h-6" />}
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                                Бесплатно
                                            </span>
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <ArrowUpRight className="w-3 h-3" /> {item.downloads}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <h3 className="font-bold text-lg mb-2 text-white group-hover:text-green-400 transition-colors">{item.title}</h3>
                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">
                                        {item.description}
                                    </p>

                                    {/* Card Action */}
                                    <button
                                        onClick={() => handleDownload(item)}
                                        className="w-full flex items-center justify-center py-3 rounded-xl font-bold transition-all bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Скачать
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Premium Resources Section */}
                {premiumResources.length > 0 && (
                    <div className="mb-20">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="bg-blue-500/20 text-blue-400 p-2 rounded-lg"><Lock className="w-5 h-5" /></span>
                            Premium материалы
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {premiumResources.map((item) => (
                                <div key={item.id} className="group relative overflow-hidden rounded-2xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300 bg-slate-900/60 backdrop-blur-xl p-6">
                                    {/* Glow Effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none"></div>

                                    {/* New Badge */}
                                    {item.is_new && (
                                        <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-br-lg z-20 flex items-center gap-1 shadow-lg">
                                            <Flame className="w-3 h-3" /> NEW
                                        </div>
                                    )}

                                    {/* Card Top */}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 text-blue-400">
                                            {item.type === 'Документы' && <FileText className="w-6 h-6" />}
                                            {item.type === 'Виза' && <Plane className="w-6 h-6" />}
                                            {item.type === 'Гранты' && <CheckCircle className="w-6 h-6" />}
                                            {item.type === 'IELTS' && <GraduationCap className="w-6 h-6" />}
                                            {item.type === 'Другое' && <BookOpen className="w-6 h-6" />}
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                                <Lock className="w-3 h-3" /> Premium
                                            </span>
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <ArrowUpRight className="w-3 h-3" /> {item.downloads}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <h3 className="font-bold text-lg mb-2 text-white group-hover:text-blue-400 transition-colors">{item.title}</h3>
                                    <div className="relative">
                                        <p className={`text-gray-400 text-sm mb-6 leading-relaxed ${!isPremium ? 'blur-[1px] select-none' : ''}`}>
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Card Action */}
                                    {isPremium ? (
                                        <button
                                            onClick={() => handleDownload(item)}
                                            className="w-full flex items-center justify-center py-3 rounded-xl font-bold transition-all bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Скачать
                                        </button>
                                    ) : (
                                        <Link
                                            href="/get-plan"
                                            className="w-full flex items-center justify-center py-3 rounded-xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-400 transition-all shadow-lg shadow-yellow-900/20 group-hover:shadow-yellow-500/20"
                                        >
                                            <Lock className="w-4 h-4 mr-2" />
                                            Разблокировать
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {filteredResources.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Ничего не найдено</h3>
                        <p className="text-gray-400">Попробуйте изменить фильтры или поисковый запрос</p>
                    </div>
                )}

                {/* Unlock All Banner */}
                {!isPremium && (
                    <div className="sticky bottom-8 z-50">
                        <div className="max-w-4xl mx-auto bg-slate-900/90 backdrop-blur-xl border border-yellow-500/50 rounded-2xl p-4 md:p-6 shadow-[0_0_50px_rgba(234,179,8,0.2)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                            {/* Shine Effect */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite]"></div>

                            <div className="flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 border border-yellow-500/30 shrink-0">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">Разблокируй все 50+ файлов</h3>
                                    <p className="text-gray-400 text-sm">Получи полный доступ к базе знаний прямо сейчас.</p>
                                </div>
                            </div>

                            <Link
                                href="/get-plan"
                                className="w-full md:w-auto bg-yellow-500 text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20 whitespace-nowrap text-center relative z-10"
                            >
                                Получить доступ за 20 000 ₸
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
