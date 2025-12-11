import { Database } from './database.types';

export type Course = Database['public']['Tables']['courses']['Row'] & {
    instructor?: {
        full_name: string | null;
    };
};

export type Module = Database['public']['Tables']['modules']['Row'] & {
    lessons: Lesson[];
};

export type Lesson = Database['public']['Tables']['lessons']['Row'] & {
    is_completed?: boolean; // computed property
};

export type Enrollment = Database['public']['Tables']['enrollments']['Row'];

export interface UserProgress {
    total_score: number;
    rank_name: string;
    completed_courses: number;
    ongoing_courses: number;
}
