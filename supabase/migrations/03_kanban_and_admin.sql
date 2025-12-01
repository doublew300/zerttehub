-- 1. Add 'role' column to users table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role') THEN
        ALTER TABLE public.users ADD COLUMN role text DEFAULT 'user';
    END IF;
END $$;

-- 2. Create 'applications' table for Kanban Board
CREATE TABLE IF NOT EXISTS public.applications (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    university_id uuid REFERENCES public.universities(id) ON DELETE CASCADE NOT NULL,
    status text NOT NULL DEFAULT 'wishlist', -- 'wishlist', 'preparing', 'applied', 'accepted', 'rejected'
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, university_id)
);

-- 3. Enable RLS on applications
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for applications
-- Users can view their own applications
CREATE POLICY "Users can view own applications" ON public.applications
    FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own applications
CREATE POLICY "Users can insert own applications" ON public.applications
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own applications
CREATE POLICY "Users can update own applications" ON public.applications
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own applications
CREATE POLICY "Users can delete own applications" ON public.applications
    FOR DELETE USING (auth.uid() = user_id);

-- 5. Update RLS Policies for universities (Admin Access)
-- Allow admins to insert/update/delete universities
-- Note: We assume a function or claim check for 'admin' role, but for simplicity in this MVP, 
-- we might rely on the client-side check or a simple row check if we could. 
-- For now, let's keep universities readable by everyone (already done) and writable by no one via API 
-- unless we add specific admin policies.

-- Policy for Admin Insert (requires enabling RLS on universities if not fully enabled for all)
-- CREATE POLICY "Admins can insert universities" ON public.universities
--     FOR INSERT WITH CHECK (
--       EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
--     );
-- (Commented out to avoid complexity if RLS setup varies. We will rely on manual SQL or Supabase Dashboard for now, 
-- or implement a secure server-side action if needed. For this MVP, we'll focus on the user-facing Kanban).
