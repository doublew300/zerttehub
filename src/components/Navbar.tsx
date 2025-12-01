'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, User, LogOut, Settings } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { createClient } from '@/lib/supabase'
import { useRouter, usePathname } from 'next/navigation'
import { User as SupabaseUser } from '@supabase/supabase-js'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { language, setLanguage, t } = useLanguage()
    const [user, setUser] = useState<SupabaseUser | null>(null)
    const router = useRouter()
    const pathname = usePathname()
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            subscription.unsubscribe()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [supabase])

    const toggleMenu = () => setIsOpen(!isOpen)

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/')
        router.refresh()
    }

    const isActive = (path: string) => pathname === path

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center group">
                            <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">ZertteHub</span>
                            <span className="text-2xl font-bold text-[var(--color-kz-gold)] group-hover:text-yellow-300 transition-colors">.kz</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-all relative group ${isActive('/') ? 'text-white' : 'text-white/70 hover:text-white'}`}
                        >
                            {t('home')}
                            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform transition-transform origin-left ${isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                        </Link>
                        <Link
                            href="/universities"
                            className={`text-sm font-medium transition-all relative group ${isActive('/universities') ? 'text-white' : 'text-white/70 hover:text-white'}`}
                        >
                            {t('universities')}
                            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform transition-transform origin-left ${isActive('/universities') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                        </Link>
                        <Link
                            href="/checklists"
                            className={`text-sm font-medium transition-all relative group ${isActive('/checklists') ? 'text-white' : 'text-white/70 hover:text-white'}`}
                        >
                            {t('checklists')}
                            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 transform transition-transform origin-left ${isActive('/checklists') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                        </Link>

                        <div className="flex items-center space-x-2 bg-white/5 rounded-full p-1 border border-white/10">
                            <button
                                onClick={() => setLanguage('ru')}
                                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'ru' ? 'bg-white text-black shadow-sm' : 'text-white/70 hover:text-white'}`}
                            >
                                RU
                            </button>
                            <button
                                onClick={() => setLanguage('kz')}
                                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'kz' ? 'bg-white text-black shadow-sm' : 'text-white/70 hover:text-white'}`}
                            >
                                KZ
                            </button>
                        </div>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link href="/dashboard" className="text-white/90 hover:text-blue-400 flex items-center transition-colors font-medium">
                                    <User className="w-4 h-4 mr-2" />
                                    Кабинет
                                </Link>
                                <Link href="/profile" className="text-white/50 hover:text-white transition-colors" title="Настройки профиля">
                                    <Settings className="w-5 h-5" />
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="text-white/50 hover:text-red-400 transition-colors"
                                    title="Выйти"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/auth"
                                className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                            >
                                {t('login')}
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white/80 hover:bg-white/10 focus:outline-none"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 absolute w-full left-0 top-full shadow-2xl">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        <Link href="/" className={`block px-3 py-3 rounded-xl text-base font-medium transition-colors ${isActive('/') ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                            {t('home')}
                        </Link>
                        <Link href="/universities" className={`block px-3 py-3 rounded-xl text-base font-medium transition-colors ${isActive('/universities') ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                            {t('universities')}
                        </Link>
                        <Link href="/checklists" className={`block px-3 py-3 rounded-xl text-base font-medium transition-colors ${isActive('/checklists') ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                            {t('checklists')}
                        </Link>

                        <div className="border-t border-white/10 my-4 pt-4">
                            {user ? (
                                <>
                                    <Link href="/dashboard" className="flex items-center px-3 py-3 rounded-xl text-base font-medium text-white hover:bg-white/5 transition-colors">
                                        <User className="w-5 h-5 mr-3" />
                                        Кабинет
                                    </Link>
                                    <Link href="/profile" className="flex items-center px-3 py-3 rounded-xl text-base font-medium text-white hover:bg-white/5 transition-colors">
                                        <Settings className="w-5 h-5 mr-3" />
                                        Настройки профиля
                                    </Link>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full flex items-center px-3 py-3 rounded-xl text-base font-medium text-red-400 hover:bg-red-500/10 transition-colors mt-2"
                                    >
                                        <LogOut className="w-5 h-5 mr-3" />
                                        Выйти
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/auth"
                                    className="block w-full text-center bg-blue-600 text-white px-3 py-3 rounded-xl text-base font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
                                >
                                    {t('login')}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
