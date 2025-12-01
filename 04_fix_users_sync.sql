-- Backfill public.users from auth.users
-- This is necessary for users who signed up BEFORE the public.users table was created.

INSERT INTO public.users (id, email, full_name, role)
SELECT 
    id, 
    email, 
    COALESCE(raw_user_meta_data->>'full_name', 'User'), 
    'user'
FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- Verify the sync
SELECT count(*) as total_users FROM public.users;
