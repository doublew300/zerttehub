'use client'

import { Quote, Star } from 'lucide-react'
import Image from 'next/image'

const TESTIMONIALS = [
    {
        id: 1,
        name: 'Айгерим С.',
        uni: 'KAIST',
        country: 'Южная Корея 🇰🇷',
        grant: 'Full Tuition + Stipend',
        text: 'ZertteHub помог мне структурировать подготовку. Я думала, что с моим IELTS 6.5 грант нереален, но мы подобрали идеальную стратегию для Кореи.',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 2,
        name: 'Санжар К.',
        uni: 'TU Munich',
        country: 'Германия 🇩🇪',
        grant: 'Free Education',
        text: 'Самое сложное было разобраться с документами для Uni-Assist. Чек-листы на платформе спасли мне кучу нервов. Сейчас учусь на инженера бесплатно!',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 3,
        name: 'Дильназ М.',
        uni: 'Charles University',
        country: 'Чехия 🇨🇿',
        grant: 'Government Scholarship',
        text: 'Я даже не знала, что в Чехии можно учиться бесплатно на чешском. Платформа открыла мне глаза на возможности, о которых не говорят в школе.',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 4,
        name: 'Ержан Б.',
        uni: 'Politecnico di Milano',
        country: 'Италия 🇮🇹',
        grant: 'DSU Scholarship',
        text: 'Получил стипендию 7000 евро и бесплатное обучение. Без ZertteHub я бы запутался в дедлайнах и требованиях по ISEE.',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
    }
]

// Duplicate for infinite loop
const MARQUEE_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]

export default function TestimonialsSection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Истории успеха</h2>
                    <p className="text-xl text-gray-400">Наши студенты уже учатся в вузах мечты</p>
                </div>

                {/* Marquee Container with Fade Masks */}
                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex gap-8 animate-scroll hover:[animation-play-state:paused] w-max">
                        {MARQUEE_ITEMS.map((item, idx) => (
                            <div
                                key={`${item.id}-${idx}`}
                                className="w-[280px] md:w-[400px] bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl relative group hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:border-blue-500/30"
                            >
                                {/* Quote Icon */}
                                <div className="absolute top-6 right-8 text-blue-500/20 group-hover:text-blue-500/40 transition-colors">
                                    <Quote className="w-10 h-10 fill-current" />
                                </div>

                                {/* User Info */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/30 relative group-hover:border-blue-400 transition-colors">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">{item.name}</h4>
                                        <p className="text-sm text-blue-400 font-medium">{item.uni}</p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                                    ))}
                                </div>

                                {/* Text */}
                                <p className="text-gray-300 leading-relaxed mb-6 relative z-10 text-sm">
                                    "{item.text}"
                                </p>

                                {/* Tags */}
                                <div className="pt-6 border-t border-white/5 flex flex-wrap gap-2">
                                    <span className="text-xs font-bold bg-white/5 text-gray-400 px-3 py-1 rounded-full border border-white/5">
                                        {item.country}
                                    </span>
                                    <span className="text-xs font-bold bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">
                                        {item.grant}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
