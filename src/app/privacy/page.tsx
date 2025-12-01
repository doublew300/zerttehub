import { Shield, Lock, Eye } from 'lucide-react'

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Политика конфиденциальности
                    </h1>
                    <p className="text-gray-400">
                        Последнее обновление: 30 ноября 2025
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm space-y-12">

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold">1. Общие положения</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                Настоящая Политика конфиденциальности описывает, как ZertteHub («мы», «нас» или «наш») собирает, использует и защищает вашу информацию при использовании нашего веб-сайта и услуг.
                            </p>
                            <p>
                                Мы серьезно относимся к защите ваших персональных данных и соблюдаем применимое законодательство Республики Казахстан о защите данных.
                            </p>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                                <Eye className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold">2. Сбор информации</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>Мы собираем следующие типы информации:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Личные данные:</strong> Имя, адрес электронной почты, номер телефона, которые вы предоставляете при регистрации или покупке услуг.</li>
                                <li><strong>Данные об использовании:</strong> Информация о том, как вы взаимодействуете с сайтом (просмотренные страницы, время на сайте), собираемая автоматически.</li>
                                <li><strong>Данные квиза:</strong> Ответы на вопросы о предпочтениях в обучении для формирования рекомендаций.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold">3. Использование данных</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>Мы используем вашу информацию для:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Предоставления и поддержки наших услуг.</li>
                                <li>Персонализации вашего опыта (например, рекомендации университетов).</li>
                                <li>Связи с вами по поводу обновлений, предложений и поддержки.</li>
                                <li>Обработки платежей и предотвращения мошенничества.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4 text-white">4. Защита данных</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Мы принимаем разумные меры безопасности для защиты вашей информации от несанкционированного доступа, изменения или уничтожения. Однако ни один метод передачи данных через Интернет не является на 100% безопасным.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4 text-white">5. Связь с нами</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Если у вас есть вопросы о нашей Политике конфиденциальности, пожалуйста, свяжитесь с нами по адресу: <a href="mailto:support@zerttehub.kz" className="text-blue-400 hover:underline">support@zerttehub.kz</a>.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    )
}
