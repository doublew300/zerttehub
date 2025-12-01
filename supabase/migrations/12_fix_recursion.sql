-- 1. Create a secure function to check admin status
-- SECURITY DEFINER means this function runs with the privileges of the creator (postgres/admin),
-- bypassing RLS on the users table for this specific check.
create or replace function public.is_admin()
returns boolean
language sql
security definer
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid()
    and role = 'admin'
  );
$$;

-- 2. Drop the problematic policies
drop policy if exists "Admins View All Users" on public.users;
drop policy if exists "Admins Update Users" on public.users;

-- 3. Re-create policies using the secure function
create policy "Admins View All Users"
on public.users for select
to authenticated
using (
  is_admin()
);

create policy "Admins Update Users"
on public.users for update
to authenticated
using (
  is_admin()
)
with check (
  is_admin()
);
