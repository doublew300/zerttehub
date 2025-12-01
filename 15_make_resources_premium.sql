-- Make everything premium first
UPDATE public.resources SET is_free = false;

-- Set a few specific "teaser" resources to free
UPDATE public.resources 
SET is_free = true 
WHERE title IN (
    'Шаблон CV (Europass)',
    'IELTS Speaking: Топ-50 вопросов',
    'Словарь абитуриента',
    'Список волонтерских организаций'
);
