-- Ensure users can view their own profile (avoids recursion in admin checks)
create policy "Users View Own Profile"
on public.users for select
using ( auth.uid() = id );

-- Explicitly set admin role for the user (just in case)
update public.users
set role = 'admin'
where email = 'doublemail300@gmail.com';
