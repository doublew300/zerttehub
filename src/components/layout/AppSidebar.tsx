'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, BarChart2, Award, Settings, LogOut, User } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AppSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    const isActive = (path: string) => pathname?.startsWith(path);

    const navItems = [
        { name: 'Дашборд', href: '/dashboard', icon: Home },
        { name: 'Мои курсы', href: '/courses', icon: BookOpen },
        { name: 'Рейтинг', href: '/leaderboard', icon: BarChart2 },
        { name: 'Достижения', href: '/achievements', icon: Award },
        { name: 'Настройки', href: '/settings', icon: Settings },
    ];

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-[var(--color-surface)] border-r border-white/5 flex flex-col z-40 hidden md:flex">
            {/* Logo Area */}
            <div className="p-6 border-b border-white/5">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">Z</span>
                    </div>
                    <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        ZertteHub
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${active
                                    ? 'bg-blue-600/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)] border border-blue-500/20'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }
              `}
                        >
                            <Icon className={`w-5 h-5 ${active ? 'text-blue-400' : 'group-hover:text-white'}`} />
                            <span className="font-medium">{item.name}</span>
                            {active && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile / Footer */}
            <div className="p-4 border-t border-white/5">
                <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-3 text-gray-400 hover:text-red-400 transition-colors w-full px-4 py-3 rounded-xl hover:bg-red-500/5 group"
                >
                    <LogOut className="w-5 h-5 group-hover:rotate-[-10deg] transition-transform" />
                    <span className="font-medium">Выйти</span>
                </button>
            </div>
        </aside>
    );
}
