
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DollarSign, GraduationCap, Globe, CheckCircle, Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase-server'
import AddToWishlistButton from '@/components/AddToWishlistButton'

export default async function UniversityPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createClient()

    const { data: university } = await supabase
        .from('universities')
        .select('*')
        .eq('slug', slug)
        .single()

    if (!university) {
        notFound()
    }

    // Parse details_json if it exists
    const details = university.details_json || {}
    const description = details.description
    const website = details.website

    // Check User Premium Status
    const { data: { user } } = await supabase.auth.getUser()
    let isPremium = false

    if (user) {
        const { data: profile } = await supabase
            .from('users')
            .select('is_premium, role')
            .eq('id', user.id)
            .single()

        if (profile?.is_premium || profile?.role === 'admin') {
            isPremium = true
        }
    }

    return (
        <div className="min-h-screen bg-black text-white pb-20">
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                {/* Header Protection Gradient */}
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center transform scale-105"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000&auto=format&fit=crop')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-32" />

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 max-w-7xl mx-auto">
                    <div className="mb-4">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-2 drop-shadow-2xl">
                            {university.name}
                        </h1>
                        <div className="flex items-center gap-2 text-xl text-gray-300 mt-2">
                            <span>{university.flag_emoji}</span>
                            <span>{university.city}, {university.country}</span>
                        </div>
                        {website && (
                            <a href={website} target="_blank" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors w-fit mt-4">
                                <Globe className="w-4 h-4" />
                                <span className="underline decoration-blue-400/30 underline-offset-4">Официальный сайт</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left Column: Content & Paywall */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Description Teaser */}
                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg leading-relaxed text-gray-300">
                            {description ? description.split('.')[0] + '.' : `Престижный университет в городе ${university.city}, предлагающий передовые программы обучения и отличные карьерные перспективы для выпускников.`}
                        </p>
                    </div>

                    {/* Content Logic: Premium vs Paywall */}
                    {isPremium ? (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                                <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                                    <GraduationCap className="w-6 h-6 text-yellow-500" />
                                    Программы обучения
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {details.programs ? (
                                        details.programs.map((prog: string, idx: number) => (
                                            <div key={idx} className="p-4 bg-black/40 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors">
                                                {prog}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 col-span-2">Информация о программах уточняется.</p>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                                <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                                    <CheckCircle className="w-6 h-6 text-green-500" />
                                    Требования к поступлению
                                </h3>
                                <ul className="space-y-4">
                                    {details.requirements ? (
                                        details.requirements.map((req: string, idx: number) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5"></div>
                                                {req}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-400">Требования уточняются.</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        /* Blurred Paywall Block */
                        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/30">
                            {/* Fake Blurred Content */}
                            <div className="p-10 filter blur-md select-none opacity-40 pointer-events-none">
                                <h3 className="text-2xl font-bold mb-6 text-white">Программы обучения</h3>
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {[1, 2, 3, 4, 5, 6].map(i => (
                                        <div key={i} className="h-16 bg-white/10 rounded-xl w-full"></div>
                                    ))}
                                </div>
                                <h3 className="text-2xl font-bold mb-6 text-white">Требования к поступлению</h3>
                                <div className="space-y-6">
                                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                                    <div className="h-4 bg-white/10 rounded w-1/2"></div>
                                    <div className="h-4 bg-white/10 rounded w-5/6"></div>
                                    <div className="h-20 bg-white/10 rounded w-full"></div>
                                </div>
                            </div>

                            {/* CTA Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center p-6 z-10">
                                <div className="bg-black/60 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-8 text-center max-w-md shadow-2xl transform hover:scale-105 transition-all duration-500 group">
                                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                                        <Lock className="w-8 h-8 text-black" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Полный разбор вуза</h3>
                                    <p className="text-gray-400 mb-6">
                                        Программы, дедлайны, стипендии и секреты поступления доступны в RoadMap.
                                    </p>
                                    <Link
                                        href="/get-plan"
                                        className="block w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.4)] animate-pulse hover:animate-none transition-all"
                                    >
                                        Разблокировать за 30 000 ₸
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Sticky Sidebar */}
                <div className="relative">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                    <span className="text-gray-400 flex items-center gap-2"><DollarSign className="w-5 h-5" /> Стоимость</span>
                                    <span className="text-xl font-bold text-white">{university.cost_description}</span>
                                </div>
                                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                    <span className="text-gray-400 flex items-center gap-2"><GraduationCap className="w-5 h-5" /> IELTS</span>
                                    <span className="text-xl font-bold text-white">{university.ielts_score}+</span>
                                </div>
                                {university.scholarship_info && (
                                    <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                        <span className="text-gray-400 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> Грант</span>
                                        <span className="text-right font-medium text-green-400">{university.scholarship_info}</span>
                                    </div>
                                )}
                            </div>

                            <AddToWishlistButton
                                universityId={university.id}
                                className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group hover:scale-105"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
