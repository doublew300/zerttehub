-- 99_lms_schema.sql

-- 1. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    instructor_id UUID REFERENCES auth.users(id),
    is_published BOOLEAN DEFAULT false,
    price NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Everyone can view published courses
CREATE POLICY "Courses are viewable by everyone" ON public.courses
    FOR SELECT USING (is_published = true);

-- Admins can manage courses
CREATE POLICY "Admins can manage courses" ON public.courses
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );


-- 2. Modules Table
CREATE TABLE IF NOT EXISTS public.modules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;

-- Visible if course is published (or user is enrolled/admin - simplistic view for now)
CREATE POLICY "Modules viewable if course public" ON public.modules
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.courses WHERE id = modules.course_id AND is_published = true)
    );
-- Admins manage
CREATE POLICY "Admins manage modules" ON public.modules
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );


-- 3. Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    content TEXT, -- Markdown or HTML content
    video_url TEXT,
    duration_minutes INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    is_free_preview BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- RLS: User can see lesson IF:
-- 1. It's a free preview
-- 2. OR User is enrolled in the course
-- 3. OR User is Admin
CREATE POLICY "Lessons access policy" ON public.lessons
    FOR SELECT USING (
        is_free_preview = true
        OR
        EXISTS (
            SELECT 1 FROM public.enrollments e
            JOIN public.modules m ON m.course_id = e.course_id
            WHERE m.id = lessons.module_id
            AND e.user_id = auth.uid()
        )
        OR
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "Admins manage lessons" ON public.lessons
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );


-- 4. Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    progress INTEGER DEFAULT 0, -- percent 0-100
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, course_id)
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own enrollments" ON public.enrollments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins manage enrollments" ON public.enrollments
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );


-- 5. Lesson Completions (For Progress Tracking)
CREATE TABLE IF NOT EXISTS public.lesson_completions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, lesson_id)
);

ALTER TABLE public.lesson_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own completions" ON public.lesson_completions
    FOR ALL USING (auth.uid() = user_id);


-- 6. User Scores (Gamification)
CREATE TABLE IF NOT EXISTS public.user_scores (
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,
    total_score INTEGER DEFAULT 0,
    rank_name TEXT DEFAULT 'Novice', -- Novice, Apprentice, Expert, Master, Legend
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.user_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone view scores" ON public.user_scores
    FOR SELECT USING (true); -- Public Leaderboard

-- Trigger to update updated_at
-- (Simplified for now, logic to update score will be in API or Database Function)
