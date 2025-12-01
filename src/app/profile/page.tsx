'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { User as UserIcon, Mail, Lock, Save, Loader2, CreditCard } from 'lucide-react'
import { toast } from 'sonner'

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [isPremium, setIsPremium] = useState(false)

    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/auth')
                return
            }
            setUser(user)
            setFullName(user.user_metadata?.full_name || '')

            // Check premium status
            const { data: profile } = await supabase
                .from('users')
                .select('is_premium')
                .eq('id', user.id)
                .single()

            if (profile) {
                setIsPremium(profile.is_premium)
            }

            setLoading(false)
        }
        getUser()
    }, [supabase, router])

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const updates: { data: { full_name: string }; password?: string } = {
                data: { full_name: fullName }
            }

            if (password) {
                updates.password = password
            }

            const { error } = await supabase.auth.updateUser(updates)

            if (error) throw error

            // Also update public users table
            const { error: dbError } = await supabase
                .from('users')
                .update({ full_name: fullName })
                .eq('id', user?.id)

            if (dbError) throw dbError

            toast.success('Профиль успешно обновлен')
            setPassword('') // Clear password field
        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error('Ошибка при обновлении профиля')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-white pt-24 pb-12 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">Настройки профиля</h1>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-lg">
                            {fullName ? fullName[0].toUpperCase() : user?.email?.[0].toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{fullName || 'Пользователь'}</h2>
                            <p className="text-gray-400">{user?.email}</p>
                            <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${isPremium ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 'bg-gray-700 text-gray-300'}`}>
                                {isPremium ? 'Premium Plan' : 'Free Plan'}
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    className="w-full bg-black/30 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-gray-400 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Имя</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="Ваше имя"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Новый пароль (оставьте пустым, если не меняете)</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="••••••••"
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Сохранение...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-5 h-5 mr-2" />
                                        Сохранить изменения
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {!isPremium && (
                    <div className="mt-8 bg-gradient-to-r from-yellow-600/20 to-yellow-500/10 border border-yellow-500/20 rounded-3xl p-6 flex items-center justify-between backdrop-blur-md">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Перейдите на Premium</h3>
                                <p className="text-yellow-200/70 text-sm">Получите доступ ко всем вузам и планам</p>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push('/get-plan')}
                            className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-900/20"
                        >
                            Купить
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
