'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Trash2, Edit, Search, Loader2, FileText, ArrowLeft, Lock, Unlock, Download } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminResourcesPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [resources, setResources] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/auth')
                return
            }

            const { data: profile } = await supabase
                .from('users')
                .select('role')
                .eq('id', user.id)
                .single()

            if (profile?.role !== 'admin') {
                router.push('/dashboard')
            }
        }

        const fetchData = async () => {
            const { data } = await supabase
                .from('resources')
                .select('*')
                .order('created_at', { ascending: false })

            if (data) {
                setResources(data)
            }
            setLoading(false)
        }

        checkAdmin()
        fetchData()
    }, [supabase, router])

    const deleteResource = async (id: string) => {
        if (!confirm('Вы уверены, что хотите удалить этот материал?')) return

        const { error } = await supabase
            .from('resources')
            .delete()
            .eq('id', id)

        if (error) {
            alert('Ошибка при удалении')
            console.error(error)
        } else {
            setResources(prev => prev.filter(r => r.id !== id))
        }
    }

    const filteredResources = resources.filter(res =>
        res.title.toLowerCase().includes(search.toLowerCase()) ||
        res.type.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-black text-white"><Loader2 className="animate-spin text-blue-500 w-10 h-10" /></div>
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-white pt-24 px-8 pb-12">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                            <ArrowLeft className="w-6 h-6 text-gray-400" />
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Материалы</h1>
                            <p className="text-gray-400 mt-1">Управление базой знаний</p>
                        </div>
                    </div>
                    <Link
                        href="/admin/resources/new"
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-1"
                    >
                        <Plus className="w-5 h-5" />
                        Добавить материал
                    </Link>
                </div>

                {/* Content Section */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-400" />
                            Список файлов
                        </h2>
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Поиск по названию..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {filteredResources.length > 0 ? (
                            filteredResources.map((res, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={res.id}
                                    className="group flex flex-col md:flex-row items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all"
                                >
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl shadow-inner ${res.is_free ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                            {res.is_free ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{res.title}</div>
                                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs font-mono">{res.type}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                                <span className="flex items-center gap-1">
                                                    <Download className="w-3 h-3" /> {res.downloads}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-end">
                                        <div className="flex gap-2">
                                            <Link
                                                href={`/admin/resources/${res.id}`}
                                                className="p-2 bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 rounded-lg transition-colors border border-white/5 hover:border-blue-500/30 inline-flex items-center justify-center"
                                                title="Редактировать"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => deleteResource(res.id)}
                                                className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-colors border border-white/5 hover:border-red-500/30"
                                                title="Удалить"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                Ничего не найдено
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
