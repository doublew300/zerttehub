'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PlayCircle, Clock, Star } from 'lucide-react';
import { Course } from '@/types/lms';

interface CourseCardProps {
    course: Course;
    progress?: number;
}

export default function CourseCard({ course, progress }: CourseCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="glass-card rounded-2xl overflow-hidden group relative flex flex-col h-full"
        >
            {/* Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <img
                    src={course.thumbnail_url || 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800'}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600/90 text-white backdrop-blur-sm border border-blue-400/30">
                        КУРС
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {course.title}
                </h3>

                <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">
                    {course.description || 'Изучите этот курс, чтобы поступить в университет мечты.'}
                </p>

                {/* Access Info */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                            <span className="font-bold text-xs">{course.instructor?.full_name?.charAt(0) || 'I'}</span>
                        </div>
                        <span>{course.instructor?.full_name || 'ZertteHub'}</span>
                    </div>

                    <div className="text-right">
                        {progress !== undefined ? (
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-blue-400 font-bold mb-1">{progress}% Завершено</span>
                                <div className="w-20 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        ) : (
                            <span className="text-lg font-bold text-[var(--color-accent)]">
                                {course.price && course.price > 0 ? `${course.price.toLocaleString()} ₸` : 'Бесплатно'}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Overlay */}
            <Link href={`/learning/${course.slug}`} className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white text-black rounded-full font-bold flex items-center space-x-2 shadow-2xl"
                >
                    <PlayCircle className="w-5 h-5" />
                    <span>Начать обучение</span>
                </motion.button>
            </Link>
        </motion.div>
    );
}
