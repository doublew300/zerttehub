'use client';

import { useState } from 'react';
import { PlayCircle, CheckCircle, Lock, ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// MOCK DATA
const COURSE_DATA = {
    title: 'Полное руководство по поступлению в США',
    modules: [
        {
            id: 'm1',
            title: 'Модуль 1: Подготовка и Стратегия',
            lessons: [
                { id: 'l1', title: 'Введение. Как работает система США', duration: '10:00', isCompleted: true, isLocked: false },
                { id: 'l2', title: 'Выбор университетов: Safety, Match, Reach', duration: '15:30', isCompleted: true, isLocked: false },
                { id: 'l3', title: 'Timeline поступления', duration: '12:00', isCompleted: false, isLocked: false },
            ]
        },
        {
            id: 'm2',
            title: 'Модуль 2: Документы (Common App)',
            lessons: [
                { id: 'l4', title: 'Разбор Personal Statement', duration: '20:00', isCompleted: false, isLocked: true },
                { id: 'l5', title: 'Рекомендательные письма', duration: '18:00', isCompleted: false, isLocked: true },
            ]
        }
    ]
};

export default function LearningPage({ params }: { params: { courseId: string } }) {
    const [activeLesson, setActiveLesson] = useState(COURSE_DATA.modules[0].lessons[2]); // Default to first uncompleted
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-black text-white overflow-hidden font-display">
            {/* Sidebar (Modules) */}
            <AnimatePresence mode='wait'>
                {sidebarOpen && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 320, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="bg-[var(--color-surface)] border-r border-white/5 flex flex-col h-full flex-shrink-0"
                    >
                        <div className="p-6 border-b border-white/5">
                            <Link href="/courses" className="text-sm text-gray-500 hover:text-white mb-2 block">&larr; Назад к курсам</Link>
                            <h2 className="font-bold text-lg leading-tight">{COURSE_DATA.title}</h2>
                            <div className="mt-4 w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full w-[40%]" />
                            </div>
                            <div className="text-xs text-gray-400 mt-1 flex justify-between">
                                <span>40% завершено</span>
                                <span>2/5 уроков</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                            {COURSE_DATA.modules.map((module) => (
                                <div key={module.id} className="mb-2">
                                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center">
                                        <ChevronDown className="w-3 h-3 mr-1" />
                                        {module.title}
                                    </div>
                                    <div className="space-y-1">
                                        {module.lessons.map((lesson) => (
                                            <button
                                                key={lesson.id}
                                                onClick={() => !lesson.isLocked && setActiveLesson(lesson)}
                                                disabled={lesson.isLocked}
                                                className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-all ${activeLesson.id === lesson.id
                                                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                                        : 'hover:bg-white/5 text-gray-300'
                                                    } ${lesson.isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                <div className="mr-3">
                                                    {lesson.isLocked ? (
                                                        <Lock className="w-4 h-4 text-gray-600" />
                                                    ) : lesson.isCompleted ? (
                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                    ) : (
                                                        <PlayCircle className={`w-4 h-4 ${activeLesson.id === lesson.id ? 'text-blue-400' : 'text-gray-500'}`} />
                                                    )}
                                                </div>
                                                <div className="text-left flex-1">
                                                    <div className="line-clamp-1">{lesson.title}</div>
                                                    <div className="text-xs text-gray-500 mt-0.5">{lesson.duration}</div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full relative">
                <div className="absolute top-4 left-4 z-20">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 bg-black/50 backdrop-blur-md rounded-lg hover:bg-white/10 text-white transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto bg-[var(--color-background)]">
                    {/* Video Player Area */}
                    <div className="w-full aspect-video bg-black relative flex items-center justify-center group">
                        {/* Mock Video Player */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        <img
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                            alt="Lesson preview"
                            className="w-full h-full object-cover opacity-60"
                        />
                        <button className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                            <PlayCircle className="w-10 h-10 text-white fill-white" />
                        </button>
                    </div>

                    {/* Lesson Content */}
                    <div className="max-w-4xl mx-auto px-8 py-12">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">{activeLesson.title}</h1>
                                <p className="text-gray-400">Модуль 1 &bull; 12 минут просмотра</p>
                            </div>
                            <button className="px-6 py-2 bg-[var(--color-primary)] hover:bg-blue-600 text-white rounded-full font-bold transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                Следующий урок
                            </button>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <p className="lead text-xl text-gray-300">
                                В этом уроке мы разберем основные этапы поступления в университеты США.
                                Вы узнаете, как работает система Common App и какие документы вам понадобятся.
                            </p>
                            <hr className="border-white/10 my-8" />
                            <h3>Материалы урока</h3>
                            <ul className="space-y-4 not-prose mt-4">
                                <li className="flex items-center p-4 bg-white/5 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center mr-4">
                                        PDF
                                    </div>
                                    <div>
                                        <div className="font-bold text-white group-hover:text-blue-400 transition-colors">Чек-лист документов США.pdf</div>
                                        <div className="text-sm text-gray-500">2.4 MB</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
