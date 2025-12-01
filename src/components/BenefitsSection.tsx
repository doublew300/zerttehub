'use client'

import { BookOpen, Award, ShieldCheck, MessageCircle } from 'lucide-react'

export default function BenefitsSection() {
    return (
        <div className="relative z-20 -mt-12 px-4">
            <div className="max-w-6xl mx-auto bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="flex flex-col items-center text-center space-y-2 group">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-400 mb-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform duration-300 border border-blue-500/20">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-white text-lg">50+ Вузов</div>
                    <div className="text-sm text-gray-400">Лучшие университеты</div>
                </div>
                <div className="flex flex-col items-center text-center space-y-2 group">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 mb-2 shadow-[0_0_15px_rgba(74,222,128,0.3)] group-hover:scale-110 transition-transform duration-300 border border-green-500/20">
                        <Award className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-white text-lg">100% Гранты</div>
                    <div className="text-sm text-gray-400">Полное финансирование</div>
                </div>
                <div className="flex flex-col items-center text-center space-y-2 group">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center text-purple-400 mb-2 shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform duration-300 border border-purple-500/20">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-white text-lg">Официально</div>
                    <div className="text-sm text-gray-400">Проверенные данные</div>
                </div>
                <div className="flex flex-col items-center text-center space-y-2 group">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center text-orange-400 mb-2 shadow-[0_0_15px_rgba(251,146,60,0.3)] group-hover:scale-110 transition-transform duration-300 border border-orange-500/20">
                        <MessageCircle className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-white text-lg">Поддержка 24/7</div>
                    <div className="text-sm text-gray-400">Помощь кураторов</div>
                </div>
            </div>
        </div>
    )
}
