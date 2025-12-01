'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Trash2, Edit, Search, Loader2, Building2, Users, FileText, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminPage() {
    const [universities, setUniversities] = useState<any[]>([])
    const [stats, setStats] = useState({ totalUnis: 0, totalApps: 0, totalUsers: 0 })
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        checkAdmin()
        fetchData()
    }, [])

    const checkAdmin = async () => {
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        console.log('Admin Check - User:', user?.email, authError)

        if (!user) {
            console.log('Redirecting to /auth: No user')
            router.push('/auth')
            return
        }

        const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single()

        console.log('Admin Check - Profile:', profile, profileError)

        if (profile?.role !== 'admin') {
            console.log('Redirecting to /dashboard: Role is', profile?.role)
            router.push('/dashboard')
        }
    }

    const fetchData = async () => {
        // Fetch Universities
        const { data: unis } = await supabase
            .from('universities')
            .select('*')
            .order('created_at', { ascending: false })

        if (unis) {
            setUniversities(unis)
        }

        // Fetch Stats (Mocking some for now if tables are restricted, but trying real counts)
        const { count: appsCount } = await supabase.from('applications').select('*', { count: 'exact', head: true })
        const { count: usersCount } = await supabase.from('users').select('*', { count: 'exact', head: true })

        setStats({
            totalUnis: unis?.length || 0,
            totalApps: appsCount || 0,
            totalUsers: usersCount || 0
        })

        setLoading(false)
    }

    const deleteUniversity = async (id: string) => {
        if (!confirm('Вы уверены, что хотите удалить этот университет?')) return

        const { error } = await supabase
            .from('universities')
            .delete()
            .eq('id', id)

        if (error) {
            alert('Ошибка при удалении')
            console.error(error)
        } else {
            setUniversities(unis => unis.filter(u => u.id !== id))
            setStats(prev => ({ ...prev, totalUnis: prev.totalUnis - 1 }))
        }
    }

    const filteredUniversities = universities.filter(uni =>
        uni.name.toLowerCase().includes(search.toLowerCase()) ||
        uni.country.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-black text-white"><Loader2 className="animate-spin text-blue-500 w-10 h-10" /></div>
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-white pt-24 px-8 pb-12">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Админ-панель</h1>
                        <p className="text-gray-400 mt-1">Управление контентом и аналитика</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="/admin/resources"
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold border border-white/10 transition-all"
                        >
                            <FileText className="w-5 h-5" />
                            Материалы
                        </Link>
                        <Link
                            href="/admin/users"
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold border border-white/10 transition-all"
                        >
                            <Users className="w-5 h-5" />
                            Пользователи
                        </Link>
                        <Link
                            href="/admin/universities/new"
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-1"
                        >
                            <Plus className="w-5 h-5" />
                            Добавить университет
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors group">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">{stats.totalUnis}</div>
                            <div className="text-sm text-gray-400">Университетов</div>
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors group">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">{stats.totalApps}</div>
                            <div className="text-sm text-gray-400">Заявок студентов</div>
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors group">
                        <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">{stats.totalUsers}</div>
                            <div className="text-sm text-gray-400">Пользователей</div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-blue-400" />
                            Список университетов
                        </h2>
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Поиск..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {filteredUniversities.length > 0 ? (
                            filteredUniversities.map((uni, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={uni.id}
                                    className="group flex flex-col md:flex-row items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all"
                                >
                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-2xl shadow-inner">
                                            {uni.flag_emoji}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{uni.name}</div>
                                            <div className="text-sm text-gray-500 flex items-center gap-2">
                                                {uni.city}, {uni.country}
                                                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                                <span className="text-blue-400/80 font-mono text-xs">{uni.slug}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-end">
                                        <div className="text-right hidden md:block">
                                            <div className="text-sm font-medium text-gray-300">{uni.ielts_score}+ IELTS</div>
                                            <div className="text-xs text-gray-500 max-w-[150px] truncate">{uni.cost_description}</div>
                                        </div>

                                        <div className="flex gap-2">
                                            <Link
                                                href={`/admin/universities/${uni.id}`}
                                                className="p-2 bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 rounded-lg transition-colors border border-white/5 hover:border-blue-500/30 inline-flex items-center justify-center"
                                                title="Редактировать"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => deleteUniversity(uni.id)}
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
