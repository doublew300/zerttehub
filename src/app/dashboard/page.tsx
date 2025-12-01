'use client'

import { useState, useEffect } from 'react'
import { CheckSquare, Square, Download, LogOut, Loader2, Lock, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import KanbanBoard from '@/components/KanbanBoard'

const initialSteps = [
    { id: 1, text: 'Выбрать страну и вуз', completed: false, link: '/universities', cta: 'Открыть каталог' },
    { id: 2, text: 'Сдать IELTS (минимум 6.0)', completed: false, link: '/checklists', cta: 'Материалы для подготовки' },
    { id: 3, text: 'Собрать документы (аттестат, справки)', completed: false, link: '/checklists', cta: 'Шаблоны документов' },
    { id: 4, text: 'Написать мотивационное письмо', completed: false, link: '/checklists', cta: 'Примеры писем' },
    { id: 5, text: 'Подать заявку на сайте вуза', completed: false },
    { id: 6, text: 'Получить приглашение (Acceptance Letter)', completed: false },
    { id: 7, text: 'Подать на визу', completed: false, link: '/checklists', cta: 'Гайд по визам' },
]

export default function Dashboard() {
    const [steps, setSteps] = useState(initialSteps)
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState<any>(null)
    const [recommendedUnis, setRecommendedUnis] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState<'roadmap' | 'applications'>('roadmap')
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/auth')
                return
            }

            const { data: profileData } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single()

            // Merge auth data with profile data
            const mergedProfile = {
                ...profileData,
                email: user.email, // Always use auth email as primary
                full_name: profileData?.full_name || user.user_metadata?.full_name,
                id: user.id
            }

            setProfile(mergedProfile)

            if (profileData?.progress?.steps) {
                // Merge saved progress with initial steps structure to keep links
                const savedSteps = profileData.progress.steps
                const mergedSteps = initialSteps.map(initialStep => {
                    const savedStep = savedSteps.find((s: any) => s.id === initialStep.id)
                    return savedStep ? { ...initialStep, completed: savedStep.completed } : initialStep
                })
                setSteps(mergedSteps)
            }

            // Fetch Recommendations based on Quiz Results
            const quizResults = localStorage.getItem('quiz_results')
            if (quizResults) {
                const answers = JSON.parse(quizResults)

                // 1. Parse User Preferences
                // Q1: English Level -> Max IELTS
                let userIelts = 9.0
                if (answers[0]?.includes('Beginner')) userIelts = 5.5
                else if (answers[0]?.includes('Intermediate')) userIelts = 6.0
                else if (answers[0]?.includes('Advanced')) userIelts = 7.5

                // Q2: Budget
                const userBudget = answers[1] // '0 тг', 'до 1 млн', etc.

                // Q3: Major -> Keywords
                const userMajor = answers[2]
                const majorKeywords: Record<string, string[]> = {
                    'IT и Инженерия': ['tech', 'computer', 'science', 'engineering', 'polytechnic', 'mit', 'caltech'],
                    'Бизнес и Экономика': ['business', 'econom', 'finance', 'management', 'trade'],
                    'Медицина': ['medic', 'health', 'bio', 'pharma'],
                    'Гуманитарные науки': ['art', 'social', 'human', 'law', 'design']
                }
                const targetKeywords = majorKeywords[userMajor] || []

                // 2. Fetch ALL universities to score them (client-side "AI")
                const { data: allUnis } = await supabase.from('universities').select('*')

                if (allUnis) {
                    // 3. Scoring Algorithm
                    const scoredUnis = allUnis.map((uni: any) => {
                        let score = 0
                        const reasons: string[] = []

                        // Criteria A: IELTS (Critical)
                        if (uni.ielts_score <= userIelts) {
                            score += 30
                            reasons.push('✅ Проходишь по IELTS')
                        } else {
                            score -= 10 // Penalty if IELTS is too high
                        }

                        // Criteria B: Budget (Critical)
                        const isFree = uni.cost_description?.toLowerCase().includes('бесплатно') ||
                            uni.cost_description?.toLowerCase().includes('100%') ||
                            uni.cost_description?.toLowerCase().includes('grant')

                        if (userBudget?.includes('0 тг')) {
                            if (isFree) {
                                score += 40
                                reasons.push('💰 Полный грант')
                            } else {
                                score -= 50 // Heavy penalty for paid unis if budget is 0
                            }
                        } else {
                            // If budget is not 0, any uni is fine, but free is still better
                            if (isFree) score += 10
                        }

                        // Criteria C: Major (Contextual)
                        // Search in name and slug
                        const text = (uni.name + ' ' + uni.slug).toLowerCase()
                        const hasMajorMatch = targetKeywords.some(k => text.includes(k))
                        if (hasMajorMatch) {
                            score += 20
                            reasons.push(`🎓 Сильный в ${userMajor.split(' ')[0]}`)
                        }

                        // Criteria D: Country Preference (from Quiz Q4/Q5 implicit or just variety)
                        // Bonus for "Top" countries if IELTS is high
                        if (userIelts >= 6.5 && ['usa', 'uk', 'germany'].some(c => uni.country.toLowerCase().includes(c))) {
                            score += 5
                        }

                        return { ...uni, score, matchReasons: reasons }
                    })

                    // 4. Sort and Pick Top 3
                    const topMatches = scoredUnis
                        .sort((a, b) => b.score - a.score)
                        .slice(0, 3)

                    setRecommendedUnis(topMatches)
                }
            } else {
                // Fallback: Random popular ones
                const { data: recs } = await supabase.from('universities').select('*').limit(3)
                if (recs) setRecommendedUnis(recs)
            }

            setLoading(false)
        }
        fetchData()
    }, [supabase, router])

    const toggleStep = async (id: number) => {
        const newSteps = steps.map(step =>
            step.id === id ? { ...step, completed: !step.completed } : step
        )
        setSteps(newSteps)

        if (profile) {
            const { error } = await supabase
                .from('users')
                .update({
                    progress: {
                        ...profile.progress,
                        steps: newSteps
                    }
                })
                .eq('id', profile.id)

            if (error) {
                console.error('Error saving progress:', error)
            }
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
        router.refresh()
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-kz-blue)]" />
            </div>
        )
    }

    const progress = Math.round((steps.filter(s => s.completed).length / steps.length) * 100)
    const isPremium = profile?.is_premium

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Личный кабинет</h1>
                        <div className="mt-1">
                            <p className="text-xl text-gray-300 font-medium">
                                Привет, {profile?.full_name || 'Студент'}!
                            </p>
                            {profile?.email && (
                                <p className="text-sm text-gray-500">{profile.email}</p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-red-400 transition-colors backdrop-blur-sm"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Выйти
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-8 border-b border-white/10 pb-1">
                    <button
                        onClick={() => setActiveTab('roadmap')}
                        className={`pb-3 px-2 text-lg font-medium transition-colors relative ${activeTab === 'roadmap' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        Roadmap
                        {activeTab === 'roadmap' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`pb-3 px-2 text-lg font-medium transition-colors relative ${activeTab === 'applications' ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        Мои заявки (Kanban)
                        {activeTab === 'applications' && (
                            <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
                        )}
                    </button>
                </div>

                {activeTab === 'roadmap' ? (
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Progress Section */}
                        <div className="md:col-span-2 space-y-8">
                            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
                                    Твой прогресс
                                    <span className="text-blue-400 text-lg font-normal bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                                        {progress}%
                                    </span>
                                </h2>

                                {/* Gamified Progress Bar */}
                                <div className="w-full bg-gray-800 rounded-full h-4 mb-8 overflow-hidden border border-white/5">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.5)] relative"
                                        style={{ width: `${progress}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {steps.map((step) => (
                                        <div key={step.id} className="group p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-all">
                                            <div className="flex items-center justify-between">
                                                <button
                                                    onClick={() => toggleStep(step.id)}
                                                    className="flex items-center text-left flex-grow cursor-pointer focus:outline-none"
                                                >
                                                    <div className={`mr-4 flex-shrink-0 transition-all duration-300 ${step.completed ? 'text-green-400 scale-110' : 'text-gray-500 group-hover:text-gray-400'}`}>
                                                        {step.completed ? (
                                                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_10px_rgba(34,197,94,0.4)]">
                                                                <CheckSquare className="w-4 h-4 text-white" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-6 h-6 rounded-full border-2 border-gray-600 group-hover:border-gray-500"></div>
                                                        )}
                                                    </div>
                                                    <span className={`text-lg transition-all duration-300 ${step.completed ? 'text-gray-500 line-through' : 'text-white group-hover:text-blue-200'}`}>
                                                        {step.text}
                                                    </span>
                                                </button>

                                                {/* Smart Action Button */}
                                                {step.link && !step.completed && (
                                                    <Link
                                                        href={step.link}
                                                        className="ml-4 hidden md:flex items-center px-4 py-2 text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500 hover:text-white transition-all whitespace-nowrap"
                                                    >
                                                        {step.cta}
                                                        <ArrowRight className="w-3 h-3 ml-2" />
                                                    </Link>
                                                )}
                                            </div>

                                            {/* Mobile Action Button */}
                                            {step.link && !step.completed && (
                                                <div className="mt-3 md:hidden pl-10">
                                                    <Link
                                                        href={step.link}
                                                        className="flex items-center text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                                                    >
                                                        {step.cta}
                                                        <ArrowRight className="w-3 h-3 ml-1" />
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recommended Universities Section */}
                            {recommendedUnis.length > 0 && (
                                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                                    <h2 className="text-2xl font-bold mb-6 text-white">Рекомендованные вузы</h2>
                                    <div className="grid gap-4">
                                        {recommendedUnis.map((uni) => (
                                            <Link key={uni.id} href={`/universities/${uni.slug}`} className="block group">
                                                <div className="flex items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all">
                                                    <div className="w-12 h-12 rounded-lg bg-gray-800 mr-4 overflow-hidden flex-shrink-0">
                                                        {/* Simple image fallback */}
                                                        <div className="w-full h-full bg-blue-900/50 flex items-center justify-center text-xl">
                                                            {uni.flag_emoji || '🎓'}
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{uni.name}</h4>
                                                                <p className="text-sm text-gray-400">{uni.city}, {uni.country}</p>
                                                            </div>
                                                            {uni.score && (
                                                                <span className="text-xs font-bold bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-500/30">
                                                                    {uni.score}% Match
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* AI Reasons */}
                                                        {uni.matchReasons && uni.matchReasons.length > 0 && (
                                                            <div className="mt-2 flex flex-wrap gap-2">
                                                                {uni.matchReasons.map((reason: string, idx: number) => (
                                                                    <span key={idx} className="text-[10px] bg-white/5 text-gray-300 px-1.5 py-0.5 rounded border border-white/5">
                                                                        {reason}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-right hidden sm:block ml-4">
                                                        <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20 whitespace-nowrap">
                                                            {uni.ielts_score}+ IELTS
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="mt-6 text-center">
                                        <Link href="/universities" className="text-blue-400 hover:text-blue-300 text-sm font-semibold">
                                            Смотреть все университеты &rarr;
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Premium Materials Sidebar */}
                        <div>
                            {isPremium ? (
                                <div className="bg-gradient-to-b from-blue-900/40 to-slate-900/40 backdrop-blur-xl border border-blue-500/30 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>

                                    <h3 className="font-bold text-xl mb-2 relative z-10">Твой план Premium</h3>
                                    <p className="text-blue-200 text-sm mb-8 relative z-10 flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        Доступ активен до 01.09.2026
                                    </p>

                                    <div className="space-y-4 relative z-10">
                                        <button className="flex items-center w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-all group">
                                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mr-4 group-hover:scale-110 transition-transform">
                                                <Download className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-sm text-white">Персональный Roadmap</div>
                                                <div className="text-xs text-gray-400">PDF, 2.4 MB</div>
                                            </div>
                                        </button>
                                        <button className="flex items-center w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-all group">
                                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 mr-4 group-hover:scale-110 transition-transform">
                                                <Download className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-sm text-white">Все чек-листы</div>
                                                <div className="text-xs text-gray-400">ZIP, 15 MB</div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gradient-to-b from-yellow-900/10 to-transparent backdrop-blur-xl border border-yellow-500/30 p-8 rounded-3xl text-center relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors duration-500"></div>

                                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-black shadow-[0_0_20px_rgba(234,179,8,0.3)] transform group-hover:scale-110 transition-transform duration-500">
                                        <Lock className="w-8 h-8" />
                                    </div>

                                    <h3 className="font-bold text-xl mb-3 text-white">Доступ ограничен</h3>
                                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                        Получите персональный план поступления и доступ ко всем закрытым материалам.
                                    </p>

                                    <Link
                                        href="/get-plan"
                                        className="block w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] transition-all transform hover:-translate-y-1"
                                    >
                                        Получить план
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <KanbanBoard />
                )}
            </div>
        </div>
    )
}
