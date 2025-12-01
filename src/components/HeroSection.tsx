'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Globe, GraduationCap, Search, ChevronDown } from 'lucide-react'
import Quiz from '@/components/Quiz'

const QUICK_PILLS = [
    { label: '🇬🇧 Англия', slug: 'uk' },
    { label: '🇺🇸 США', slug: 'usa' },
    { label: '🇨🇿 Чехия', slug: 'czech-republic' },
    { label: '🇹🇷 Турция', slug: 'turkey' },
    { label: '🇰🇷 Корея', slug: 'south-korea' },
    { label: '🇩🇪 Германия', slug: 'germany' },
    { label: '🇨🇳 Китай', slug: 'china' },
]

export default function HeroSection() {
    const [isCountryOpen, setIsCountryOpen] = useState(false)
    const [isProgramOpen, setIsProgramOpen] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState('Куда едем?')
    const [selectedProgram, setSelectedProgram] = useState('Программа')

    return (
        <section className="relative pt-32 pb-32 px-4 overflow-hidden min-h-[800px] flex items-center">
            {/* Background Image with Depth & Texture */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/80 to-blue-800/90 z-10 mix-blend-multiply"></div>
                {/* Header Protection Gradient */}
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-20"></div>
                <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop"
                    alt="University Campus"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
                />
                {/* Grain Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 mix-blend-soft-light"></div>
            </div>

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10 w-full">
                <div className="animate-[fade-in_0.8s_ease-out_forwards]">
                    <h1 className="text-4xl md:text-7xl font-extrabold mb-6 md:mb-8 leading-tight animate-[slide-up_0.8s_ease-out_forwards] tracking-tighter drop-shadow-2xl">
                        Твой путь в топовые вузы мира <span className="text-[var(--color-kz-gold)]">бесплатно</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-10 animate-[slide-up_0.8s_ease-out_0.2s_forwards] opacity-0 max-w-lg leading-relaxed font-light">
                        Персональный план поступления для школьников Казахстана. Узнай свои шансы на грант прямо сейчас.
                    </p>

                    {/* Smart Search Dock - Glass Effect with Inner Glow */}
                    <div className="animate-[slide-up_0.8s_ease-out_0.4s_forwards] opacity-0">
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-2 flex flex-col md:flex-row items-center gap-2 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] max-w-xl relative z-50">

                            {/* Country Selector */}
                            <div className="relative w-full md:w-auto flex-1">
                                <button
                                    onClick={() => { setIsCountryOpen(!isCountryOpen); setIsProgramOpen(false) }}
                                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/10 rounded-xl transition-colors text-left group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/30 flex items-center justify-center text-blue-100 group-hover:bg-blue-500/40 transition-colors">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Страна</div>
                                            <div className="text-sm font-bold truncate text-white">{selectedCountry}</div>
                                        </div>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-blue-200 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown */}
                                {isCountryOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-full md:w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 overflow-hidden z-50 py-2">
                                        {['Турция', 'Чехия', 'США', 'Великобритания', 'Корея'].map(country => (
                                            <button
                                                key={country}
                                                onClick={() => { setSelectedCountry(country); setIsCountryOpen(false) }}
                                                className="w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 text-sm transition-colors font-medium border-b border-gray-100 last:border-0"
                                            >
                                                {country}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="hidden md:block w-px h-12 bg-white/20"></div>

                            {/* Program Selector */}
                            <div className="relative w-full md:w-auto flex-1">
                                <button
                                    onClick={() => { setIsProgramOpen(!isProgramOpen); setIsCountryOpen(false) }}
                                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/10 rounded-xl transition-colors text-left group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-100 group-hover:bg-purple-500/40 transition-colors">
                                            <GraduationCap className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-purple-200 font-medium uppercase tracking-wider">Программа</div>
                                            <div className="text-sm font-bold truncate text-white">{selectedProgram}</div>
                                        </div>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-purple-200 transition-transform ${isProgramOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown */}
                                {isProgramOpen && (
                                    <div className="absolute top-full left-0 mt-2 w-full md:w-56 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 overflow-hidden z-50 py-2">
                                        {['Бакалавриат', 'Магистратура', 'Языковые курсы'].map(prog => (
                                            <button
                                                key={prog}
                                                onClick={() => { setSelectedProgram(prog); setIsProgramOpen(false) }}
                                                className="w-full text-left px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-600 text-sm transition-colors font-medium border-b border-gray-100 last:border-0"
                                            >
                                                {prog}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Search Button */}
                            <Link
                                href="/universities"
                                className="w-full md:w-auto bg-[var(--color-kz-gold)] hover:bg-yellow-400 text-[var(--color-kz-blue)] font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,199,44,0.3)] hover:shadow-[0_0_30px_rgba(255,199,44,0.5)] hover:-translate-y-0.5 whitespace-nowrap"
                            >
                                <Search className="w-5 h-5" />
                                <span>Найти</span>
                            </Link>
                        </div>

                        {/* Quick Pills */}
                        <div className="mt-8 flex flex-wrap gap-3">
                            {QUICK_PILLS.map((pill) => (
                                <Link
                                    key={pill.slug}
                                    href={`/universities?country=${pill.slug}`}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 hover:border-white/30 transition-all text-sm backdrop-blur-sm text-blue-100 hover:text-white"
                                >
                                    <span>{pill.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative animate-[fade-in_1s_ease-out_0.5s_forwards] opacity-0">
                    <Quiz />
                </div>
            </div>
        </section>
    )
}
