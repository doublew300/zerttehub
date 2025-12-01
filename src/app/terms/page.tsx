import { FileText, AlertCircle, CheckSquare } from 'lucide-react'

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Условия использования
                    </h1>
                    <p className="text-gray-400">
                        Последнее обновление: 30 ноября 2025
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm space-y-12">

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold">1. Принятие условий</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                Получая доступ к веб-сайту ZertteHub и используя его, вы соглашаетесь соблюдать настоящие Условия использования и все применимые законы и правила. Если вы не согласны с каким-либо из этих условий, вам запрещено использовать этот сайт.
                            </p>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                                <CheckSquare className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold">2. Использование лицензии</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                Разрешается временно загружать одну копию материалов (информации или программного обеспечения) с веб-сайта ZertteHub только для личного, некоммерческого временного просмотра. Это предоставление лицензии, а не передача права собственности.
                            </p>
                            <p>В соответствии с этой лицензией вы не можете:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Изменять или копировать материалы;</li>
                                <li>Использовать материалы в коммерческих целях или для публичного показа;</li>
                                <li>Пытаться декомпилировать или реверс-инжинирить любое программное обеспечение на сайте ZertteHub;</li>
                                <li>Удалять любые авторские права или другие проприетарные обозначения из материалов.</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold">3. Отказ от ответственности</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                Материалы на веб-сайте ZertteHub предоставляются «как есть». ZertteHub не дает никаких гарантий, явных или подразумеваемых, и настоящим отказывается от всех других гарантий, включая, помимо прочего, подразумеваемые гарантии товарной пригодности или пригодности для конкретной цели.
                            </p>
                            <p>
                                ZertteHub не гарантирует точность, вероятные результаты или надежность использования материалов на своем веб-сайте или иным образом связанных с такими материалами.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4 text-white">4. Изменения условий</h2>
                        <p className="text-gray-300 leading-relaxed">
                            ZertteHub может пересматривать настоящие условия обслуживания для своего веб-сайта в любое время без предварительного уведомления. Используя этот веб-сайт, вы соглашаетесь соблюдать текущую версию настоящих Условий использования.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4 text-white">5. Применимое право</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Любые претензии, связанные с веб-сайтом ZertteHub, регулируются законодательством Республики Казахстан без учета коллизионных норм.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    )
}
