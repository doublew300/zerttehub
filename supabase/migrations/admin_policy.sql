-- Allow authenticated users to insert universities
create policy "Authenticated users can insert universities"
on public.universities
for insert
to authenticated
with check (true);

-- Allow authenticated users to update universities
create policy "Authenticated users can update universities"
on public.universities
for update
to authenticated
using (true)
with check (true);

-- Allow authenticated users to delete universities
create policy "Authenticated users can delete universities"
on public.universities
for delete
to authenticated
using (true);
