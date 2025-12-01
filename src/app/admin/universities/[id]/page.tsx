'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'

export default function EditUniversityPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        city: '',
        slug: '',
        cost_description: '',
        ielts_score: '',
        flag_emoji: '',
        scholarship_info: '',
        description: '', // From details_json
        website: '' // From details_json
    })

    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const fetchUniversity = async () => {
            const { data: uni, error } = await supabase
                .from('universities')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                alert('Ошибка загрузки')
                router.push('/admin')
                return
            }

            if (uni) {
                setFormData({
                    name: uni.name,
                    country: uni.country,
                    city: uni.city,
                    slug: uni.slug,
                    cost_description: uni.cost_description || '',
                    ielts_score: uni.ielts_score?.toString() || '',
                    flag_emoji: uni.flag_emoji || '',
                    scholarship_info: uni.scholarship_info || '',
                    description: uni.details_json?.description || '',
                    website: uni.details_json?.website || ''
                })
            }
            setLoading(false)
        }
        fetchUniversity()
    }, [id, supabase, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        const { error } = await supabase
            .from('universities')
            .update({
                name: formData.name,
                country: formData.country,
                city: formData.city,
                slug: formData.slug,
                cost_description: formData.cost_description,
                ielts_score: parseFloat(formData.ielts_score),
                flag_emoji: formData.flag_emoji,
                scholarship_info: formData.scholarship_info,
                details_json: {
                    description: formData.description,
                    website: formData.website,
                    // Preserve other existing json fields if we fetched them, but for now simplistic
                }
            })
            .eq('id', id)

        if (error) {
            alert('Ошибка сохранения: ' + error.message)
        } else {
            router.push('/admin')
        }
        setSaving(false)
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-black text-white"><Loader2 className="animate-spin text-blue-500 w-10 h-10" /></div>
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-white pt-24 px-8 pb-12">
            <div className="max-w-3xl mx-auto">
                <Link href="/admin" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Назад к списку
                </Link>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                    <h1 className="text-3xl font-bold mb-8">Редактирование университета</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Название</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Slug (URL)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.slug}
                                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Страна</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.country}
                                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Город</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.city}
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Стоимость (текст)</label>
                                <input
                                    type="text"
                                    value={formData.cost_description}
                                    onChange={e => setFormData({ ...formData, cost_description: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">IELTS (число)</label>
                                <input
                                    type="number"
                                    step="0.5"
                                    value={formData.ielts_score}
                                    onChange={e => setFormData({ ...formData, ielts_score: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400">Флаг (Emoji)</label>
                                <input
                                    type="text"
                                    value={formData.flag_emoji}
                                    onChange={e => setFormData({ ...formData, flag_emoji: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors text-2xl text-center"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Информация о гранте</label>
                            <input
                                type="text"
                                value={formData.scholarship_info}
                                onChange={e => setFormData({ ...formData, scholarship_info: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Описание</label>
                            <textarea
                                rows={5}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Веб-сайт</label>
                            <input
                                type="url"
                                value={formData.website}
                                onChange={e => setFormData({ ...formData, website: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 focus:border-blue-500 outline-none transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
                        >
                            {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                            Сохранить изменения
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
