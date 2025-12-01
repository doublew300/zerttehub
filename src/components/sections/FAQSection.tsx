'use client'

import { useState } from 'react'
import { Plus, Minus, HelpCircle } from 'lucide-react'

const FAQS = [
    {
        question: "Реально ли получить 100% грант?",
        answer: "Да, абсолютно. Ежегодно тысячи студентов поступают на гранты в Турцию, Венгрию, Китай и другие страны. Главное — правильно собрать документы и подать заявку в срок. Наша платформа дает пошаговый план, как это сделать."
    },
    {
        question: "Чем вы лучше агентств за $2000?",
        answer: "Агентства часто делают ту же работу, но берут огромную комиссию за 'сопровождение'. Мы даем вам те же инструменты, шаблоны и инструкции, но за 20 000 ₸. Вы контролируете процесс сами, не переплачивая посредникам."
    },
    {
        question: "Что если я не знаю, куда поступать?",
        answer: "Внутри платформы есть подробный каталог университетов с фильтрами по бюджету и специальностям. Плюс, в премиум-доступе есть гайды по выбору страны, которые помогут определиться."
    },
    {
        question: "Как быстро я получу доступ?",
        answer: "Мгновенно. Сразу после оплаты вам откроется доступ ко всем закрытым материалам, чек-листам и базе знаний в личном кабинете."
    },
    {
        question: "Нужен ли идеальный английский?",
        answer: "Нет. Многие программы (например, в Турции или Китае) предлагают год языковых курсов (Foundation) бесплатно или за символическую плату. Мы рассказываем, как на них попасть."
    }
]

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section className="py-20 px-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-xl mb-4">
                        <HelpCircle className="w-6 h-6 text-blue-400" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Частые вопросы</h2>
                    <p className="text-gray-400">Всё, что нужно знать перед стартом</p>
                </div>

                <div className="space-y-4">
                    {FAQS.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index
                                    ? 'bg-slate-800/60 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]'
                                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`font-bold text-lg transition-colors ${openIndex === index ? 'text-blue-400' : 'text-white'}`}>
                                    {faq.question}
                                </span>
                                <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-gray-400'}`}>
                                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </div>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
