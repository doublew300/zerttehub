'use client'

import { Search, Map, FolderOpen, Award } from 'lucide-react'

const STEPS = [
    {
        title: 'Выбор вуза',
        description: 'Изучи базу из 50+ университетов и выбери мечту.',
        icon: Search,
        color: 'blue'
    },
    {
        title: 'Персональный план',
        description: 'Получи пошаговый алгоритм поступления с дедлайнами.',
        icon: Map,
        color: 'purple'
    },
    {
        title: 'Подача документов',
        description: 'Собери идеальный пакет документов с нашей помощью.',
        icon: FolderOpen,
        color: 'orange'
    },
    {
        title: 'Грант',
        description: 'Поступи на бюджет и учись бесплатно!',
        icon: Award,
        color: 'green'
    }
]

export default function RoadmapSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Ambient Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] -z-10 rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Как это работает?</h2>
                    <p className="text-xl text-gray-400">Твой путь к гранту за 4 шага</p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Connecting Line with Glow */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] rounded-full hidden md:block"></div>

                    <div className="space-y-12 md:space-y-24">
                        {STEPS.map((step, index) => (
                            <div key={index} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 group ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                {/* Text Content */}
                                <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--color-kz-gold)] transition-colors">{step.title}</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">{step.description}</p>
                                </div>

                                {/* Icon Circle with Neon Effect */}
                                <div className="relative z-10 flex-shrink-0">
                                    <div className={`w-24 h-24 rounded-full bg-slate-950 border-2 border-${step.color}-500 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] group-hover:scale-110 transition-all duration-500`}>
                                        <step.icon className={`w-10 h-10 text-${step.color}-400 group-hover:text-white transition-colors`} />
                                    </div>
                                    {/* Pulse Effect */}
                                    <div className={`absolute inset-0 rounded-full bg-${step.color}-500/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-1000`}></div>
                                </div>

                                {/* Empty Spacer for Grid Balance */}
                                <div className="flex-1 hidden md:block"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
