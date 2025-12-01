'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ArrowRight, Plus, Check } from 'lucide-react'
import { UNIVERSITY_IMAGES } from '@/lib/universityImages'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { getCountryCode } from '@/lib/flags'

interface UniversityProps {
    university: {
        id: string
        slug: string
        name: string
        country: string
        city: string
        cost_description: string
        ielts_score: number | string
        flag_emoji?: string
        scholarship_info?: string
        image?: string
        image_url?: string
    }
    index?: number
}

const getUniImage = (name: string, slug: string) => {
    if (UNIVERSITY_IMAGES[slug]) {
        return UNIVERSITY_IMAGES[slug]
    }
    return `https://image.pollinations.ai/prompt/photorealistic%20campus%20of%20${encodeURIComponent(name)}%20university,%20sunny%20day,%204k,%20architecture?width=600&height=400&nologo=true`
}

export default function UniversityCard({ university }: UniversityProps) {
    const [imgError, setImgError] = useState(false)
    const [adding, setAdding] = useState(false)
    const [added, setAdded] = useState(false)
    const supabase = createClient()
    const router = useRouter()

    // Flag Logic
    const countryCode = getCountryCode(university.country) || 'eu';

    const imageUrl = university.image_url || getUniImage(university.name, university.slug)
    const fallbackImage = `https://image.pollinations.ai/prompt/modern%20university%20building%20glass%20facade%20night%20lights%204k?width=600&height=400&nologo=true&seed=${university.slug}`

    let badgeText = null;
    if (university.cost_description?.includes('100%')) badgeText = "100% ГРАНТ";
    else if (university.cost_description?.toLowerCase().includes('бесплатно')) badgeText = "БЕСПЛАТНО";
    else if (university.scholarship_info) badgeText = "ГРАНТ";

    const addToWishlist = async (e: React.MouseEvent) => {
        e.preventDefault() // Prevent navigation
        setAdding(true)

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            router.push('/auth')
            return
        }

        const { error } = await supabase
            .from('applications')
            .insert({
                user_id: user.id,
                university_id: university.id,
                status: 'wishlist'
            })

        if (error) {
            if (error.code === '23505') { // Unique violation
                setAdded(true) // Already added
            } else {
                console.error('Error adding to wishlist:', error)
            }
        } else {
            setAdded(true)
        }
        setAdding(false)
    }

    return (
        <Link href={`/universities/${university.slug}`} className="block group h-full">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-blue-500/50 overflow-hidden h-full flex flex-col transform hover:-translate-y-2 relative group-hover:bg-white/10">
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gray-900 overflow-hidden">
                    <Image
                        src={imgError ? fallbackImage : imageUrl}
                        alt={`${university.name} campus`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        onError={() => setImgError(true)}
                        unoptimized={imgError} // Fallback might need unoptimized if external
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                    {/* Badge Overlay */}
                    {badgeText && (
                        <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)] backdrop-blur-md z-10">
                            {badgeText}
                        </div>
                    )}
                </div>

                <div className="p-6 flex-grow flex flex-col space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                        {university.name}
                    </h3>

                    <div className="flex items-center text-gray-400 text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                        {university.city}, {university.country}
                        <Image
                            src={`https://flagcdn.com/w40/${countryCode}.png`}
                            alt={university.country}
                            width={20}
                            height={15}
                            className="ml-2 w-5 h-auto rounded-sm shadow-sm"
                        />
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/10 space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Стоимость</span>
                            <span className="font-medium text-gray-200 text-right max-w-[60%] truncate" title={university.cost_description}>{university.cost_description}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">IELTS</span>
                            <span className="font-medium text-gray-200">{university.ielts_score}+</span>
                        </div>
                    </div>
                </div>

                <div className="px-6 pb-6 pt-0 flex gap-2">
                    <div className="flex-1 py-3 flex items-center justify-center text-blue-400 font-bold text-sm bg-blue-500/10 rounded-xl transition-colors border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500">
                        Подробнее <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </div>

                    {/* Add to Wishlist Button */}
                    <button
                        onClick={addToWishlist}
                        disabled={adding || added}
                        className={`w-12 flex items-center justify-center rounded-xl border transition-all ${added
                            ? 'bg-green-500 text-white border-green-500'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                            }`}
                    >
                        {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </Link>
    )
}
