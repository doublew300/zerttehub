'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Search, Loader2, User, CheckCircle, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminUsersPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [users, setUsers] = useState<any[]>([])
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
                .from('users')
                .select('*')
                .order('created_at', { ascending: false })

            if (data) {
                setUsers(data)
            }
            setLoading(false)
        }

        checkAdmin()
        fetchData()
    }, [supabase, router])

    const togglePremium = async (userId: string, currentStatus: boolean) => {
        const { error } = await supabase
            .from('users')
            .update({ is_premium: !currentStatus })
            .eq('id', userId)

        if (error) {
            alert('Ошибка при обновлении статуса')
            console.error(error)
        } else {
            setUsers(prev => prev.map(u =>
                u.id === userId ? { ...u, is_premium: !currentStatus } : u
            ))
        }
    }

    const filteredUsers = users.filter(user =>
        (user.full_name?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (user.email?.toLowerCase() || '').includes(search.toLowerCase())
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
                            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Пользователи</h1>
                            <p className="text-gray-400 mt-1">Управление студентами</p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-400" />
                            Список студентов
                        </h2>
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Поиск по имени или email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-gray-400 border-b border-white/10">
                                    <th className="p-4 font-medium">Пользователь</th>
                                    <th className="p-4 font-medium">Email</th>
                                    <th className="p-4 font-medium">Роль</th>
                                    <th className="p-4 font-medium">Статус</th>
                                    <th className="p-4 font-medium text-right">Действия</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user, index) => (
                                        <motion.tr
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.03 }}
                                            key={user.id}
                                            className="hover:bg-white/5 transition-colors"
                                        >
                                            <td className="p-4">
                                                <div className="font-bold text-white">{user.full_name || 'Без имени'}</div>
                                                <div className="text-xs text-gray-500">{new Date(user.created_at).toLocaleDateString()}</div>
                                            </td>
                                            <td className="p-4 text-gray-300">{user.email}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {user.is_premium ? (
                                                    <span className="flex items-center gap-1 text-green-400 text-sm font-bold">
                                                        <CheckCircle className="w-4 h-4" /> Premium
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                                                        <XCircle className="w-4 h-4" /> Basic
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-right">
                                                <button
                                                    onClick={() => togglePremium(user.id, user.is_premium)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${user.is_premium
                                                        ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                                                        : 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20'
                                                        }`}
                                                >
                                                    {user.is_premium ? 'Снять Premium' : 'Выдать Premium'}
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">
                                            Пользователи не найдены
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
