'use client'

import UniversityForm from '@/components/UniversityForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CreateUniversityPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/admin" className="flex items-center text-gray-500 hover:text-gray-900 mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к списку
            </Link>

            <h1 className="text-3xl font-bold mb-8">Добавить новый университет</h1>

            <UniversityForm />
        </div>
    )
}
