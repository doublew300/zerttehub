'use client'

import { useState, useEffect } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export default function GetPlanPage() {
    const [selectedPlan, setSelectedPlan] = useState<'basic' | 'pro'>('pro')
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    })

    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUser(user)
                setFormData(prev => ({
                    ...prev,
                    email: user.email || '',
                    fullName: user.user_metadata?.full_name || ''
                }))
            }
        }
        checkUser()
    }, [supabase])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (!user) {
                // If not logged in, redirect to auth
                // Ideally we'd pass state, but for MVP let's just push to auth
                router.push(`/auth?next=/get-plan`)
                return
            }

            // Fetch current profile to preserve existing progress
            const { data: currentProfile } = await supabase
                .from('users')
                .select('progress')
                .eq('id', user.id)
                .single()

            const currentProgress = currentProfile?.progress || {}

            // Update user profile
            const { error } = await supabase
                .from('users')
                .update({
                    full_name: formData.fullName,
                    is_premium: true,
                    progress: {
                        ...currentProgress, // Preserve existing progress (e.g. steps)
                        phone: formData.phone,
                        plan: selectedPlan,
                        plan_date: new Date().toISOString(),
                        status: 'paid'
                    }
                })
                .eq('id', user.id)

            if (error) throw error

            // Simulate payment delay
            setTimeout(() => {
                router.push('/dashboard')
            }, 1000)

        } catch (error) {
            console.error('Error:', error)
            alert('Произошла ошибка. Попробуйте еще раз.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Выберите свой план</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Инвестируйте в свое будущее сегодня. Это дешевле, чем один месяц обучения на платном.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                    {/* Basic Plan */}
                    <div
                        onClick={() => setSelectedPlan('basic')}
                        className={`cursor-pointer p-8 rounded-3xl border transition-all duration-300 backdrop-blur-xl relative group ${selectedPlan === 'basic' ? 'bg-slate-900/80 border-blue-500 ring-2 ring-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.2)] scale-105 z-10' : 'bg-slate-900/40 border-white/10 hover:bg-slate-900/60 hover:border-white/20 opacity-80 hover:opacity-100'}`}
                    >
                        <h3 className="text-2xl font-bold mb-2 text-white">Базовый</h3>
                        <div className="text-4xl font-bold mb-6 text-white">20 000 ₸</div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-gray-300"><Check className="w-5 h-5 text-green-400 mr-3" /> Доступ к базе вузов</li>
                            <li className="flex items-center text-gray-300"><Check className="w-5 h-5 text-green-400 mr-3" /> 10 чек-листов</li>
                            <li className="flex items-center text-gray-300"><Check className="w-5 h-5 text-green-400 mr-3" /> Общий roadmap поступления</li>
                        </ul>
                    </div>

                    {/* Pro Plan */}
                    <div
                        onClick={() => setSelectedPlan('pro')}
                        className={`cursor-pointer p-8 rounded-3xl border transition-all duration-300 backdrop-blur-xl relative group ${selectedPlan === 'pro' ? 'bg-slate-900/80 border-yellow-500 ring-2 ring-yellow-500/20 shadow-[0_0_30px_rgba(234,179,8,0.2)] scale-105 z-10' : 'bg-slate-900/40 border-white/10 hover:bg-slate-900/60 hover:border-white/20 opacity-80 hover:opacity-100'}`}
                    >
                        <div className={`absolute top-0 right-0 text-xs font-bold px-4 py-1.5 rounded-bl-2xl rounded-tr-2xl transition-all bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.4)]`}>
                            ХИТ ПРОДАЖ
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">Персональный</h3>
                        <div className="text-4xl font-bold mb-6 text-white">30 000 ₸</div>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center text-gray-300"><Check className="w-5 h-5 text-yellow-500 mr-3" /> Всё из Базового</li>
                            <li className="flex items-center text-white font-medium"><Check className="w-5 h-5 text-yellow-500 mr-3" /> Персональный подбор 5 вузов</li>
                            <li className="flex items-center text-gray-300"><Check className="w-5 h-5 text-yellow-500 mr-3" /> Индивидуальный план по датам</li>
                            <li className="flex items-center text-gray-300"><Check className="w-5 h-5 text-yellow-500 mr-3" /> Проверка мотивационного письма</li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-md mx-auto bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10">
                    <h3 className="text-xl font-bold mb-6 text-center text-white">Оформление заказа</h3>
                    {!user && (
                        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 rounded-xl text-sm backdrop-blur-sm">
                            Для оформления заказа необходимо войти в систему. Мы перенаправим вас на страницу входа.
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Ваше имя</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl shadow-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 p-3 text-gray-100 placeholder-gray-500 outline-none transition-all"
                                placeholder="Алихан"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                            <input
                                type="email"
                                required
                                disabled={!!user}
                                className="w-full bg-black/50 border border-white/10 rounded-xl shadow-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 p-3 text-gray-100 placeholder-gray-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="example@mail.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Телефон</label>
                            <input
                                type="tel"
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-xl shadow-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 p-3 text-gray-100 placeholder-gray-500 outline-none transition-all"
                                placeholder="+7 777 000 00 00"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full font-bold py-4 rounded-xl transition-all mt-6 flex justify-center items-center shadow-lg transform hover:-translate-y-1 ${selectedPlan === 'pro' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:shadow-yellow-500/20' : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-blue-500/20'}`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                    Обработка...
                                </>
                            ) : (
                                `Оплатить ${selectedPlan === 'basic' ? '20 000' : '30 000'} ₸`
                            )}
                        </button>

                        <div className="flex items-center justify-center gap-4 mt-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                            {/* Kaspi */}
                            <div className="h-8 w-auto flex items-center justify-center bg-white rounded px-2">
                                <svg viewBox="0 0 100 30" className="h-6 w-auto">
                                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#f04e23" fontSize="20" fontWeight="bold" fontFamily="Arial">Kaspi</text>
                                </svg>
                            </div>
                            {/* Visa */}
                            <div className="h-8 w-auto flex items-center justify-center bg-white rounded px-2">
                                <svg viewBox="0 0 36 12" className="h-4 w-auto" fill="#1a1f71">
                                    <path d="M13.5 0L10.9 11.8H8.7L10.8 2.2h-2.5c-1.1 0-1.7.4-2 .9l-.2.9c0 .1.2.2.5.3.2 0 .4-.1.6-.2 2.7-1.3 2.7-1.3 3.3-4.2l.6-2.8h2.7zm-6.2 11.8h2.2L6.1 2.2H3.5c-.3 0-.6.1-.7.4L0 11.8h2.3l.5-1.4h2.8l.7 1.4zm16.5-11.8h-2.1c-.6 0-1.1.2-1.3.9l-3.8 9.1h2.3l.8-2.2h2.8l.3 2.2h2l-1-10zm-3.2 7.7l1.5-4.2.9 4.2h-2.4z" />
                                </svg>
                            </div>
                            {/* Mastercard */}
                            <div className="h-8 w-auto flex items-center justify-center bg-white rounded px-2">
                                <svg viewBox="0 0 24 16" className="h-6 w-auto">
                                    <circle cx="7" cy="8" r="7" fill="#EB001B" fillOpacity="0.8" />
                                    <circle cx="17" cy="8" r="7" fill="#F79E1B" fillOpacity="0.8" />
                                </svg>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
