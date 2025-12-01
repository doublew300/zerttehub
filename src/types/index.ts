export interface University {
    id: string
    name: string
    slug: string
    country: string
    city: string
    cost_description?: string
    ielts_score?: number
    flag_emoji?: string
    scholarship_info?: string
    image_url?: string
    details_json?: {
        description?: string
        website?: string
        programs?: string[]
    }
    // Dashboard specific
    score?: number
    matchReasons?: string[]
}

export interface Resource {
    id: string
    title: string
    description: string
    type: 'Документы' | 'Виза' | 'Гранты' | 'IELTS' | 'Другое' | string
    file_url: string
    is_free: boolean
    is_new: boolean
    downloads: number
}

export interface UserProfile {
    id: string
    email?: string
    full_name?: string
    is_premium: boolean
    progress?: {
        steps: Step[]
    }
}

export interface Step {
    id: number
    text: string
    completed: boolean
    link?: string
    cta?: string
}

export interface Application {
    id: string
    university_id: string
    user_id: string
    status: 'wishlist' | 'preparing' | 'applied' | 'accepted' | 'rejected'
    notes?: string
    university?: University
}
