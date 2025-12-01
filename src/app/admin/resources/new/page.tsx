'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2, Link as LinkIcon } from 'lucide-react'
import { toast } from 'sonner'

export default function NewResourcePage() {
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'Документы',
        file_url: '',
        is_free: false,
        downloads: 0,
        is_new: true
    })
    const supabase = createClient()
    const router = useRouter()

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/auth')
                return
            }

            const { data: profile } = await supabase
                .from('users')
                .select('role')
                .eq('id', user.id)
                .single()

            if (profile?.role !== 'admin') {
                router.push('/dashboard')
            }
        }
        checkAdmin()
    }, [supabase, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            let finalUrl = formData.file_url

            if (file) {
                setUploading(true)
                const fileExt = file.name.split('.').pop()
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
                const filePath = `${fileName}`

                const { error: uploadError } = await supabase.storage
                    .from('resources')
                    .upload(filePath, file)

                if (uploadError) throw uploadError
                finalUrl = filePath
            }

            const { error } = await supabase
                .from('resources')
                .insert([{ ...formData, file_url: finalUrl }])

            if (error) throw error

            toast.success('Материал успешно добавлен!')
            router.push('/admin/resources')
            router.refresh()
        } catch (error) {
            console.error(error)
            toast.error('Ошибка при создании')
        } finally {
            setLoading(false)
            setUploading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-white pt-24 px-8 pb-12">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/admin/resources" className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-400" />
                    </Link>
                    <h1 className="text-3xl font-bold">Добавить материал</h1>
                </div>

                {/* Form */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Название</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Например: Шаблон CV для Harvard"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Описание</label>
                            <textarea
                                required
                                rows={3}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Краткое описание пользы материала..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Тип</label>
                                <select
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                                >
                                    <option value="Документы">Документы</option>
                                    <option value="Виза">Виза</option>
                                    <option value="Гранты">Гранты</option>
                                    <option value="IELTS">IELTS</option>
                                    <option value="Другое">Другое</option>
                                </select>
                            </div>

                            {/* File Upload OR URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Файл или Ссылка</label>
                                <div className="space-y-3">
                                    {/* File Input */}
                                    <div className="relative">
                                        <input
                                            type="file"
                                            onChange={e => setFile(e.target.files?.[0] || null)}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl py-2 px-4 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 transition-colors"
                                        />
                                    </div>
                                    <div className="text-center text-xs text-gray-500">- ИЛИ -</div>
                                    {/* URL Input */}
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                                        <input
                                            type="url"
                                            value={formData.file_url}
                                            onChange={e => setFormData({ ...formData, file_url: e.target.value })}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                            placeholder="https://drive.google.com/..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Is Free */}
                            <div className="flex items-center gap-3 bg-black/30 p-4 rounded-xl border border-white/5">
                                <input
                                    type="checkbox"
                                    id="is_free"
                                    checked={formData.is_free}
                                    onChange={e => setFormData({ ...formData, is_free: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
                                />
                                <label htmlFor="is_free" className="text-sm font-medium text-white cursor-pointer select-none">
                                    Бесплатный доступ
                                </label>
                            </div>

                            {/* Is New */}
                            <div className="flex items-center gap-3 bg-black/30 p-4 rounded-xl border border-white/5">
                                <input
                                    type="checkbox"
                                    id="is_new"
                                    checked={formData.is_new}
                                    onChange={e => setFormData({ ...formData, is_new: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
                                />
                                <label htmlFor="is_new" className="text-sm font-medium text-white cursor-pointer select-none">
                                    Метка &quot;NEW&quot;
                                </label>
                            </div>

                            {/* Downloads */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Скачиваний (фейк)</label>
                                <input
                                    type="number"
                                    value={formData.downloads}
                                    onChange={e => setFormData({ ...formData, downloads: parseInt(e.target.value) })}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || uploading}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading || uploading ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                            {uploading ? 'Загрузка файла...' : 'Сохранить материал'}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}
