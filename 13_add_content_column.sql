-- Add content column to resources table
ALTER TABLE public.resources 
ADD COLUMN IF NOT EXISTS content TEXT;

-- Comment on column
COMMENT ON COLUMN public.resources.content IS 'Markdown/HTML content for the resource (alternative to file download)';
