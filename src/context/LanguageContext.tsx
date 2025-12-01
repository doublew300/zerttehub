'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'ru' | 'kz'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const translations = {
    ru: {
        home: 'Главная',
        universities: 'Вузы',
        checklists: 'Чек-листы',
        login: 'Войти',
        dashboard: 'Кабинет',
        getPlan: 'Получить план',
        heroTitle: 'Поступи в Европу или Азию в 2026 году бесплатно или за 0–3 000 $',
        heroSubtitle: 'Персональный план поступления для школьников Казахстана',
        takeQuiz: 'Пройти тест',
        footerRights: 'Все права защищены',
    },
    kz: {
        home: 'Басты бет',
        universities: 'ЖОО-лар',
        checklists: 'Чек-листтер',
        login: 'Кіру',
        dashboard: 'Кабинет',
        getPlan: 'Жоспар алу',
        heroTitle: '2026 жылы Еуропаға немесе Азияға тегін немесе 0–3 000 $ оқуға түс',
        heroSubtitle: 'Қазақстан оқушыларына арналған жеке оқуға түсу жоспары',
        takeQuiz: 'Тест тапсыру',
        footerRights: 'Барлық құқықтар қорғалған',
    },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('ru')

    useEffect(() => {
        const saved = localStorage.getItem('language') as Language
        if (saved) {
            setTimeout(() => setLanguage(saved), 0)
        }
    }, [])

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang)
        localStorage.setItem('language', lang)
    }

    const t = (key: string) => {
        // @ts-expect-error - dynamic key access
        return translations[language][key] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
