-- Enable RLS
alter table public.resources enable row level security;

-- Drop existing policies to avoid conflicts
drop policy if exists "Public View Resources" on public.resources;
drop policy if exists "Admins Manage Resources" on public.resources;
drop policy if exists "Everyone View Resources" on public.resources;

-- 1. Allow Everyone to View (Select)
create policy "Everyone View Resources"
on public.resources for select
using ( true );

-- 2. Allow Admins to Insert/Update/Delete
create policy "Admins Manage Resources"
on public.resources for all
to authenticated
using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
)
with check (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- 3. Storage Policies
-- Allow Everyone to View/Download from 'resources' bucket
drop policy if exists "Public View Resources" on storage.objects;
create policy "Public View Resources"
on storage.objects for select
using ( bucket_id = 'resources' );

