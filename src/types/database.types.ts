export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    email: string | null
                    full_name: string | null
                    role: string
                    created_at: string
                }
                Insert: {
                    id: string
                    email?: string | null
                    full_name?: string | null
                    role?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string | null
                    full_name?: string | null
                    role?: string
                    created_at?: string
                }
            }
            courses: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    description: string | null
                    thumbnail_url: string | null
                    instructor_id: string | null
                    is_published: boolean
                    price: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    description?: string | null
                    thumbnail_url?: string | null
                    instructor_id?: string | null
                    is_published?: boolean
                    price?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    description?: string | null
                    thumbnail_url?: string | null
                    instructor_id?: string | null
                    is_published?: boolean
                    price?: number
                    created_at?: string
                }
            }
            modules: {
                Row: {
                    id: string
                    course_id: string
                    title: string
                    sort_order: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    course_id: string
                    title: string
                    sort_order?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    course_id?: string
                    title?: string
                    sort_order?: number
                    created_at?: string
                }
            }
            lessons: {
                Row: {
                    id: string
                    module_id: string
                    title: string
                    content: string | null
                    video_url: string | null
                    duration_minutes: number
                    sort_order: number
                    is_free_preview: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    module_id: string
                    title: string
                    content?: string | null
                    video_url?: string | null
                    duration_minutes?: number
                    sort_order?: number
                    is_free_preview?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    module_id?: string
                    title?: string
                    content?: string | null
                    video_url?: string | null
                    duration_minutes?: number
                    sort_order?: number
                    is_free_preview?: boolean
                    created_at?: string
                }
            }
            enrollments: {
                Row: {
                    id: string
                    user_id: string
                    course_id: string
                    progress: number
                    enrolled_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    course_id: string
                    progress?: number
                    enrolled_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    course_id?: string
                    progress?: number
                    enrolled_at?: string
                }
            }
            lesson_completions: {
                Row: {
                    id: string
                    user_id: string
                    lesson_id: string
                    completed_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    lesson_id: string
                    completed_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    lesson_id?: string
                    completed_at?: string
                }
            }
            user_scores: {
                Row: {
                    user_id: string
                    total_score: number
                    rank_name: string
                    last_updated_at: string
                }
                Insert: {
                    user_id: string
                    total_score?: number
                    rank_name?: string
                    last_updated_at?: string
                }
                Update: {
                    user_id?: string
                    total_score?: number
                    rank_name?: string
                    last_updated_at?: string
                }
            }
        }
    }
}
