-- 1. Allow Admins to INSERT (Upload) files
create policy "Admins Upload Resources"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'resources' AND
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- 2. Allow Admins to DELETE files
create policy "Admins Delete Resources"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'resources' AND
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- 3. Allow Users to View/Download
create policy "Users View Resources"
on storage.objects for select
to authenticated
using ( bucket_id = 'resources' );
