'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const questions = [
    {
        id: 1,
        text: 'Какой у тебя уровень английского?',
        options: ['Beginner (A1-A2)', 'Intermediate (B1-B2)', 'Advanced (C1-C2)'],
    },
    {
        id: 2,
        text: 'Какой бюджет на год обучения?',
        options: ['0 тг (только грант)', 'до 1 млн тг', 'до 3 млн тг', 'Не ограничен'],
    },
    {
        id: 3,
        text: 'Какое направление интересует?',
        options: ['IT и Инженерия', 'Бизнес и Экономика', 'Медицина', 'Гуманитарные науки'],
    },
    {
        id: 4,
        text: 'Готов ли учить новый язык (не английский)?',
        options: ['Да, легко', 'Возможно', 'Нет, только английский'],
    },
    {
        id: 5,
        text: 'Когда планируешь поступать?',
        options: ['2025', '2026', '2027'],
    },
]

export default function Quiz() {
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [showResult, setShowResult] = useState(false)

    // Clear old results on mount to ensure fresh start if re-taking
    // useEffect(() => {
    //     localStorage.removeItem('quiz_results')
    // }, [])

    const handleAnswer = (answer: string) => {
        const newAnswers = { ...answers, [step]: answer }
        setAnswers(newAnswers)
        if (step < questions.length - 1) {
            setStep(step + 1)
        } else {
            localStorage.setItem('quiz_results', JSON.stringify(newAnswers))
            setShowResult(true)
        }
    }

    if (showResult) {
        return (
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center max-w-lg mx-auto border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                <div className="flex justify-center mb-4 relative z-10">
                    <CheckCircle2 className="w-16 h-16 text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md">Отличный результат!</h3>
                <p className="text-blue-100 mb-6 font-light">
                    У тебя высокие шансы поступить в Турцию, Венгрию или Польшу на грант.
                    Мы подобрали для тебя персональный план.
                </p>
                <Link href="/dashboard" className="inline-block bg-[var(--color-kz-gold)] text-[var(--color-kz-blue)] px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,199,44,0.3)] relative z-10">
                    Получить план бесплатно
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-lg mx-auto border border-white/20 relative overflow-hidden group hover:bg-white/15 transition-colors duration-500">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

            <div className="mb-8 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Узнай свои шансы на грант</h3>
                <p className="text-blue-200 text-sm mb-6 font-light">Ответь на 5 вопросов и получи прогноз</p>

                <div className="flex justify-between text-xs font-semibold text-blue-300 mb-2 uppercase tracking-wide">
                    <span>Прогресс</span>
                    <span>{Math.round((step / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-[var(--color-kz-gold)] h-2 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,199,44,0.5)]"
                        style={{ width: `${(step / questions.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-6 text-white leading-snug min-h-[3.5rem] flex items-center drop-shadow-sm relative z-10">
                {questions[step].text}
            </h3>

            <div className="space-y-3 relative z-10">
                {questions[step].options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/20 hover:border-white/30 transition-all duration-200 font-medium text-blue-50 hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-kz-gold)] focus:ring-offset-2 focus:ring-offset-transparent active:scale-[0.98]"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}
