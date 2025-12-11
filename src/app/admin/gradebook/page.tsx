'use client';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef, useMemo } from 'react';
import AppSidebar from '@/components/layout/AppSidebar';
import { Search } from 'lucide-react';

// MOCK DATA GENERATOR
const generateStudents = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        name: `Студент ${i + 1}`,
        email: `student${i + 1}@example.com`,
        progress: Math.floor(Math.random() * 100),
        lastActive: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleDateString(),
        course: ['IELTS Mastery', 'USA Guide', 'Turkey Grants'][Math.floor(Math.random() * 3)],
        status: Math.random() > 0.8 ? 'Офлайн' : 'Онлайн',
    }));
};

export default function GradebookPage() {
    const parentRef = useRef<HTMLDivElement>(null);

    // Memoize data so it doesn't regenerate on every render
    const students = useMemo(() => generateStudents(1000), []);

    const rowVirtualizer = useVirtualizer({
        count: students.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 60, // Estimated row height
        overscan: 5,
    });

    return (
        <div className="min-h-screen bg-[var(--color-background)] flex">
            <AppSidebar />
            <main className="flex-1 md:ml-64 p-8 overflow-hidden h-screen flex flex-col">
                {/* Header */}
                <div className="mb-8 flex justify-between items-center bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Журнал успеваемости</h1>
                        <p className="text-gray-400">
                            Демонстрация виртуализации: {students.length} студентов загружены мгновенно.
                        </p>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Поиск студента..."
                            className="bg-black/20 border border-white/10 rounded-full py-2 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 w-64"
                        />
                    </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-[var(--color-surface-highlight)] rounded-t-xl text-sm font-bold text-gray-400 uppercase tracking-wider">
                    <div className="col-span-3">Студент</div>
                    <div className="col-span-3">Курс</div>
                    <div className="col-span-3">Прогресс</div>
                    <div className="col-span-2">Последняя активность</div>
                    <div className="col-span-1 text-right">Статус</div>
                </div>

                {/* Virtualized List */}
                <div
                    ref={parentRef}
                    className="flex-1 overflow-auto bg-[var(--color-surface)]/50 border border-white/5 rounded-b-xl custom-scrollbar"
                >
                    <div
                        style={{
                            height: `${rowVirtualizer.getTotalSize()}px`,
                            width: '100%',
                            position: 'relative',
                        }}
                    >
                        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                            const student = students[virtualRow.index];
                            return (
                                <div
                                    key={virtualRow.key}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: `${virtualRow.size}px`,
                                        transform: `translateY(${virtualRow.start}px)`,
                                    }}
                                    className="grid grid-cols-12 gap-4 px-6 items-center border-b border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <div className="col-span-3 flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-white font-medium">{student.name}</div>
                                            <div className="text-xs text-gray-500">{student.email}</div>
                                        </div>
                                    </div>

                                    <div className="col-span-3 text-gray-300 text-sm">
                                        {student.course}
                                    </div>

                                    <div className="col-span-3">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-500 rounded-full"
                                                    style={{ width: `${student.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-gray-400 w-8">{student.progress}%</span>
                                        </div>
                                    </div>

                                    <div className="col-span-2 text-sm text-gray-400">
                                        {student.lastActive}
                                    </div>

                                    <div className="col-span-1 text-right">
                                        <span className={`inline-block w-2 h-2 rounded-full ${student.status === 'Онлайн' ? 'bg-green-500 shadow-[0_0_5px_lime]' : 'bg-gray-500'}`} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
