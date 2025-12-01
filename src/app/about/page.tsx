import { Users, Target, Globe } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto text-center mb-20">
                <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    О нас
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                    ZertteHub — это платформа, созданная студентами для студентов. Мы верим, что качественное образование должно быть доступно каждому, независимо от границ.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-24">
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                        <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Наша миссия</h3>
                    <p className="text-gray-400">
                        Упростить процесс поступления в зарубежные вузы, предоставив понятные инструкции, честные отзывы и поддержку на каждом этапе.
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 mb-6">
                        <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Глобальный охват</h3>
                    <p className="text-gray-400">
                        Мы собираем базу знаний по университетам США, Европы, Азии и других регионов, чтобы вы могли найти идеальное место для учебы.
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 mb-6">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">Сообщество</h3>
                    <p className="text-gray-400">
                        Мы строим комьюнити единомышленников, где каждый может поделиться опытом, задать вопрос и найти поддержку.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-12">Команда</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group">
                            <div className="w-32 h-32 mx-auto bg-gray-800 rounded-full mb-4 overflow-hidden border-2 border-white/10 group-hover:border-blue-500 transition-colors">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                                    alt="Team member"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h4 className="font-bold text-lg">Участник {i}</h4>
                            <p className="text-blue-400 text-sm">Co-Founder</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
