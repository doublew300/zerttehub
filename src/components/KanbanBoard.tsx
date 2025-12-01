'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { Loader2, Plus, Trash2, ExternalLink, ArrowRight, ArrowLeft, GraduationCap, BookOpen, Send, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { toast } from 'sonner'
import { getCountryCode } from '@/lib/flags'

type Application = {
    id: string
    university_id: string
    status: 'wishlist' | 'preparing' | 'applied' | 'accepted' | 'rejected'
    notes: string
    university: {
        name: string
        city: string
        country: string
        flag_emoji: string
        slug: string
    }
}

const COLUMNS = [
    {
        id: 'wishlist',
        title: 'Хочу поступить',
        icon: <BookOpen className="w-5 h-5 text-gray-400" />,
        color: 'from-gray-900/50 to-gray-800/50 border-gray-700/50',
        emptyText: 'Добавь вузы из каталога'
    },
    {
        id: 'preparing',
        title: 'Готовлюсь',
        icon: <GraduationCap className="w-5 h-5 text-blue-400" />,
        color: 'from-blue-900/20 to-blue-800/20 border-blue-500/20',
        emptyText: 'Начни подготовку документов'
    },
    {
        id: 'applied',
        title: 'Подал документы',
        icon: <Send className="w-5 h-5 text-yellow-400" />,
        color: 'from-yellow-900/20 to-yellow-800/20 border-yellow-500/20',
        emptyText: 'Отправь заявки и жди ответа'
    },
    {
        id: 'accepted',
        title: 'Поступил! 🎉',
        icon: <CheckCircle className="w-5 h-5 text-green-400" />,
        color: 'from-green-900/20 to-green-800/20 border-green-500/20',
        emptyText: 'Твой путь к успеху!'
    },
]

export default function KanbanBoard() {
    const [applications, setApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
            .from('applications')
            .select(`
                *,
                university:universities (
                    name,
                    city,
                    country,
                    flag_emoji,
                    slug
                )
            `)
            .eq('user_id', user.id)

        if (error) {
            console.error('Error fetching applications:', error)
            toast.error('Не удалось загрузить заявки')
        } else {
            setApplications(data as any)
        }
        setLoading(false)
    }

    const triggerConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }

    const updateStatus = async (id: string, newStatus: string) => {
        // Optimistic update
        setApplications(apps => apps.map(app =>
            app.id === id ? { ...app, status: newStatus as any } : app
        ))

        // Trigger confetti if accepted
        if (newStatus === 'accepted') {
            triggerConfetti()
            toast.success('Поздравляем с поступлением! 🎉')
        }

        const { error } = await supabase
            .from('applications')
            .update({ status: newStatus })
            .eq('id', id)

        if (error) {
            console.error('Error updating status:', error)
            toast.error('Не удалось обновить статус')
            fetchApplications() // Revert on error
        }
    }

    const deleteApplication = async (id: string) => {
        if (!confirm('Удалить заявку?')) return

        // Optimistic delete
        setApplications(apps => apps.filter(app => app.id !== id))

        const { error } = await supabase
            .from('applications')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting application:', error)
            toast.error('Не удалось удалить заявку')
            fetchApplications() // Revert
        } else {
            toast.success('Заявка удалена')
        }
    }

    if (loading) {
        return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-blue-500" /></div>
    }

    if (applications.length === 0) {
        return (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <BookOpen className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Доска пуста</h3>
                <p className="text-gray-400 mb-8 max-w-md">
                    Начни свой путь к поступлению! Добавь университеты из каталога, чтобы отслеживать прогресс и не пропустить дедлайны.
                </p>
                <Link href="/universities" className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1">
                    <Plus className="w-5 h-5 mr-2" />
                    Перейти в каталог
                </Link>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex gap-6 min-w-[1100px]">
                {COLUMNS.map(column => {
                    const columnApps = applications.filter(a => a.status === column.id)

                    return (
                        <div key={column.id} className={`flex-1 min-w-[280px] rounded-3xl p-4 border bg-gradient-to-b backdrop-blur-md flex flex-col h-full ${column.color}`}>
                            {/* Column Header */}
                            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white/5 shadow-inner">
                                        {column.icon}
                                    </div>
                                    <h3 className="font-bold text-white text-lg">{column.title}</h3>
                                </div>
                                <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full text-white/80 border border-white/5">
                                    {columnApps.length}
                                </span>
                            </div>

                            {/* Column Content */}
                            <div className="space-y-4 flex-grow">
                                <AnimatePresence mode="popLayout">
                                    {columnApps.length > 0 ? (
                                        columnApps.map(app => (
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                                key={app.id}
                                                className="bg-slate-900/90 border border-white/10 p-5 rounded-2xl shadow-lg group relative hover:border-blue-500/30 hover:shadow-blue-500/10 transition-all"
                                            >
                                                {/* Card Header */}
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shadow-inner border border-white/5 overflow-hidden p-2">
                                                        {(() => {
                                                            const code = getCountryCode(app.university.country)
                                                            return code ? (
                                                                <img
                                                                    src={`https://flagcdn.com/w40/${code}.png`}
                                                                    alt={app.university.country}
                                                                    className="w-full h-auto rounded-sm"
                                                                />
                                                            ) : (
                                                                <span>{app.university.flag_emoji}</span>
                                                            )
                                                        })()}
                                                    </div>
                                                    <button
                                                        onClick={() => deleteApplication(app.id)}
                                                        className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-red-500/10 rounded-lg"
                                                        title="Удалить"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                {/* Card Info */}
                                                <h4 className="font-bold text-white text-base mb-1 leading-tight">{app.university.name}</h4>
                                                <p className="text-xs text-gray-400 mb-4 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                                                    {app.university.city}, {app.university.country}
                                                </p>

                                                {/* Card Actions */}
                                                <div className="flex justify-between items-center pt-3 border-t border-white/5">
                                                    <Link
                                                        href={`/universities/${app.university.slug}`}
                                                        className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center transition-colors"
                                                    >
                                                        Подробнее <ExternalLink className="w-3 h-3 ml-1" />
                                                    </Link>

                                                    <div className="flex gap-2">
                                                        {column.id !== 'wishlist' && (
                                                            <button
                                                                onClick={() => updateStatus(app.id, getPrevStatus(column.id))}
                                                                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/5"
                                                                title="Назад"
                                                            >
                                                                <ArrowLeft className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                        {column.id !== 'accepted' && (
                                                            <button
                                                                onClick={() => updateStatus(app.id, getNextStatus(column.id))}
                                                                className="w-8 h-8 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors border border-blue-500/20"
                                                                title="Вперед"
                                                            >
                                                                <ArrowRight className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="h-32 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center text-gray-500/50 p-4 text-center">
                                            <div className="mb-2 opacity-50">{column.icon}</div>
                                            <span className="text-xs font-medium">{column.emptyText}</span>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function getNextStatus(current: string) {
    const order = ['wishlist', 'preparing', 'applied', 'accepted']
    const idx = order.indexOf(current)
    return order[idx + 1] || current
}

function getPrevStatus(current: string) {
    const order = ['wishlist', 'preparing', 'applied', 'accepted']
    const idx = order.indexOf(current)
    return order[idx - 1] || current
}
