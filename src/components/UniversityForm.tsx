'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

import { University } from '@/types'

interface UniversityFormProps {
    initialData?: University
    isEdit?: boolean
}

export default function UniversityForm({ initialData, isEdit = false }: UniversityFormProps) {
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        country: initialData?.country || '',
        city: initialData?.city || '',
        cost_description: initialData?.cost_description || '',
        ielts_score: initialData?.ielts_score?.toString() || '',
        flag_emoji: initialData?.flag_emoji || '',
        slug: initialData?.slug || '',
        scholarship_info: initialData?.scholarship_info || '',
        image_url: initialData?.image_url || '',
        description: initialData?.details_json?.description || '',
        website: initialData?.details_json?.website || '',
        programs: initialData?.details_json?.programs?.join(', ') || ''
    })
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const programsArray = formData.programs.split(',').map((p: string) => p.trim()).filter((p: string) => p)

        const universityData = {
            name: formData.name,
            country: formData.country,
            city: formData.city,
            cost_description: formData.cost_description,
            ielts_score: parseFloat(formData.ielts_score),
            flag_emoji: formData.flag_emoji,
            slug: formData.slug,
            scholarship_info: formData.scholarship_info,
            image_url: formData.image_url, // Add this line
            details_json: {
                description: formData.description,
                website: formData.website,
                programs: programsArray
            }
        }

        try {
            if (isEdit && initialData) {
                const { error } = await supabase
                    .from('universities')
                    .update(universityData)
                    .eq('id', initialData.id)
                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('universities')
                    .insert([universityData])
                if (error) throw error
            }

            router.push('/admin')
            router.refresh()
        } catch (error) {
            console.error('Error saving university:', error)
            alert('Ошибка при сохранении')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
                    <input
                        type="text"
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                    <input
                        type="text"
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Страна</label>
                    <input
                        type="text"
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Город</label>
                    <input
                        type="text"
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Стоимость (текст)</label>
                    <input
                        type="text"
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                        value={formData.cost_description}
                        onChange={(e) => setFormData({ ...formData, cost_description: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IELTS Score</label>
                    <input
                        type="number"
                        step="0.5"
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                        value={formData.ielts_score}
                        onChange={(e) => setFormData({ ...formData, ielts_score: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Флаг (Emoji)</label>
                    <input
                        type="text"
                        required
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                        value={formData.flag_emoji}
                        onChange={(e) => setFormData({ ...formData, flag_emoji: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Информация о гранте</label>
                    <input
                        type="text"
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                        value={formData.scholarship_info}
                        onChange={(e) => setFormData({ ...formData, scholarship_info: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL картинки (опционально)</label>
                    <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                    <p className="text-xs text-gray-500 mt-1">Оставьте пустым для авто-генерации</p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Веб-сайт</label>
                    <input
                        type="url"
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                    <textarea
                        rows={4}
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Программы (через запятую)</label>
                    <textarea
                        rows={2}
                        className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                        placeholder="Computer Science, Business, Medicine"
                        value={formData.programs}
                        onChange={(e) => setFormData({ ...formData, programs: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[var(--color-kz-blue)] text-white px-6 py-3 rounded-lg font-bold hover:bg-[var(--color-kz-blue-hover)] transition-colors flex items-center"
                >
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {isEdit ? 'Сохранить изменения' : 'Создать университет'}
                </button>
            </div>
        </form>
    )
}
