-- Allow Admins to View All Users
create policy "Admins View All Users"
on public.users for select
to authenticated
using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);

-- Allow Admins to Update Users (e.g. set premium)
create policy "Admins Update Users"
on public.users for update
to authenticated
using (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
)
with check (
  exists (select 1 from public.users where id = auth.uid() and role = 'admin')
);
