'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Plus, Check, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface AddToWishlistButtonProps {
    universityId: string
    universityName: string
    className?: string
}

export default function AddToWishlistButton({ universityId, universityName, className }: AddToWishlistButtonProps) {
    const [loading, setLoading] = useState(false)
    const [isInWishlist, setIsInWishlist] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    const handleAdd = async () => {
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            toast.error('Войдите, чтобы добавить в список')
            router.push('/auth')
            setLoading(false)
            return
        }

        const { error } = await supabase
            .from('applications')
            .insert({
                user_id: user.id,
                university_id: universityId,
                status: 'wishlist'
            })

        if (error) {
            if (error.code === '23505') { // Unique violation
                toast.info('Уже в вашем списке')
                setIsInWishlist(true)
            } else {
                toast.error('Ошибка при добавлении')
                console.error(error)
            }
        } else {
            toast.success('Добавлено в список желаемого! 🎓')
            setIsInWishlist(true)
        }
        setLoading(false)
    }

    return (
        <button
            onClick={handleAdd}
            disabled={loading || isInWishlist}
            className={`${className} ${isInWishlist ? 'bg-green-600 hover:bg-green-500 border-green-500' : ''}`}
        >
            {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : isInWishlist ? (
                <>
                    <Check className="w-5 h-5" />
                    Добавлено
                </>
            ) : (
                <>
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    Добавить в Мои Цели
                </>
            )}
        </button>
    )
}
