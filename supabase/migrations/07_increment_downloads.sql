create or replace function increment_downloads(resource_id uuid)
returns void as $$
begin
  update resources
  set downloads = downloads + 1
  where id = resource_id;
end;
$$ language plpgsql security definer;
