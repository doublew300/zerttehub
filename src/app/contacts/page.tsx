import { Mail, MapPin, Phone, Send } from 'lucide-react'
import Link from 'next/link'

export default function ContactsPage() {
    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Контакты
                </h1>
                <p className="text-xl text-gray-400">
                    Есть вопросы или предложения? Мы всегда на связи!
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                        <h3 className="text-2xl font-bold mb-6">Наши координаты</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Email</div>
                                    <div className="font-medium">support@zerttehub.kz</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Телефон</div>
                                    <div className="font-medium">+7 (777) 123-45-67</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Офис</div>
                                    <div className="font-medium">г. Алматы, пр. Аль-Фараби 77/7</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                        <h3 className="text-xl font-bold mb-4">Частые вопросы</h3>
                        <p className="text-gray-400 mb-4">
                            Прежде чем писать, посмотрите наш раздел FAQ. Возможно, ответ уже там!
                        </p>
                        <Link href="/#faq" className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2">
                            Перейти к FAQ <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                    <h3 className="text-2xl font-bold mb-6">Напишите нам</h3>
                    <form className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Имя</label>
                                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors" placeholder="Ваше имя" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Email</label>
                                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors" placeholder="example@mail.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Тема</label>
                            <select className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors text-gray-300">
                                <option>Вопрос по поступлению</option>
                                <option>Техническая проблема</option>
                                <option>Сотрудничество</option>
                                <option>Другое</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Сообщение</label>
                            <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors resize-none" placeholder="Ваше сообщение..." />
                        </div>
                        <button type="button" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2">
                            <Send className="w-5 h-5" />
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

import { ArrowRight } from 'lucide-react'
