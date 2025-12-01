'use client'

import { useState, useEffect } from 'react'
import UniversityForm from '@/components/UniversityForm'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { useParams } from 'next/navigation'

export default function EditUniversityPage() {
    const params = useParams()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [university, setUniversity] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchUniversity = async () => {
            const { data } = await supabase
                .from('universities')
                .select('*')
                .eq('id', params.id)
                .single()

            if (data) {
                setUniversity(data)
            }
            setLoading(false)
        }
        fetchUniversity()
    }, [params.id, supabase])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--color-kz-blue)]" />
            </div>
        )
    }

    if (!university) {
        return <div>Университет не найден</div>
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/admin" className="flex items-center text-gray-500 hover:text-gray-900 mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к списку
            </Link>

            <h1 className="text-3xl font-bold mb-8">Редактировать {university.name}</h1>

            <UniversityForm initialData={university} isEdit={true} />
        </div>
    )
}
