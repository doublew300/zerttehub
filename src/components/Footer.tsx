'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { Send, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
    const { t } = useLanguage()

    return (
        <footer className="bg-gray-950 text-gray-300 border-t border-gray-900 mt-auto">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-[var(--color-kz-blue)]">ZertteHub</span>
                            <span className="text-2xl font-bold text-[var(--color-kz-gold)]">.kz</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Ваш надежный проводник в мир зарубежного образования. Помогаем поступить на грант в лучшие вузы мира.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-[var(--color-kz-blue)] hover:text-white transition-all duration-300">
                                <Send className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Education */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Образование</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/universities" className="hover:text-[var(--color-kz-gold)] transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-kz-blue)]"></span>
                                    Университеты
                                </Link>
                            </li>
                            <li>
                                <Link href="/checklists" className="hover:text-[var(--color-kz-gold)] transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-kz-blue)]"></span>
                                    Чек-листы
                                </Link>
                            </li>
                            <li>
                                <Link href="/get-plan" className="hover:text-[var(--color-kz-gold)] transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-kz-blue)]"></span>
                                    Получить план
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[var(--color-kz-gold)] transition-colors flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-kz-blue)]"></span>
                                    Языковые курсы
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Countries */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Популярные страны</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/universities?country=turkey" className="hover:text-[var(--color-kz-gold)] transition-colors">Турция 🇹🇷</Link>
                            </li>
                            <li>
                                <Link href="/universities?country=czech-republic" className="hover:text-[var(--color-kz-gold)] transition-colors">Чехия 🇨🇿</Link>
                            </li>
                            <li>
                                <Link href="/universities?country=south-korea" className="hover:text-[var(--color-kz-gold)] transition-colors">Южная Корея 🇰🇷</Link>
                            </li>
                            <li>
                                <Link href="/universities?country=germany" className="hover:text-[var(--color-kz-gold)] transition-colors">Германия 🇩🇪</Link>
                            </li>
                            <li>
                                <Link href="/universities?country=usa" className="hover:text-[var(--color-kz-gold)] transition-colors">США 🇺🇸</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contacts */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">Контакты</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-[var(--color-kz-gold)] mt-1" />
                                <div>
                                    <div className="font-bold text-white">+7 (777) 123-45-67</div>
                                    <div className="text-xs text-gray-500">Ежедневно 09:00 - 21:00</div>
                                </div>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[var(--color-kz-gold)]" />
                                <a href="mailto:hello@zerttehub.kz" className="hover:text-white transition-colors">hello@zerttehub.kz</a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[var(--color-kz-gold)] mt-1" />
                                <span>г. Алматы, пр. Абая 150,<br />БЦ &quot;Алатау&quot;, офис 404</span>
                            </li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">О нас</Link></li>
                            <li><Link href="/contacts" className="text-gray-400 hover:text-white transition-colors">Контакты</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} ZertteHub.kz. {t('footerRights')}.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Договор оферты</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
