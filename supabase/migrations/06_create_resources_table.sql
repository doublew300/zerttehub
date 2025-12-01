-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL CHECK (type IN ('Документы', 'Виза', 'Гранты', 'IELTS', 'Другое')),
    file_url TEXT NOT NULL,
    is_free BOOLEAN DEFAULT false,
    downloads INTEGER DEFAULT 0,
    is_new BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can view resources (metadata)
CREATE POLICY "Everyone can view resources" ON resources
    FOR SELECT USING (true);

-- Policy: Only admins can insert/update/delete resources
CREATE POLICY "Admins can manage resources" ON resources
    FOR ALL USING (
        auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
    );

-- Insert initial data (from mock)
INSERT INTO resources (title, description, type, file_url, is_free, downloads, is_new) VALUES
('Шаблон идеального CV (Harvard style)', 'Проверенная структура резюме, которая увеличивает шансы на поступление в 3 раза.', 'Документы', '#', true, 2400, false),
('Чек-лист документов на YTB', 'Полный список всех необходимых справок и переводов для турецкого гранта.', 'Гранты', '#', false, 850, true),
('Примеры мотивационных писем', '5 реальных эссе студентов, поступивших в топовые вузы Европы и США.', 'Документы', '#', false, 1100, false),
('База вопросов на собеседовании', '100 самых частых вопросов от приемных комиссий и ответы на них.', 'IELTS', '#', false, 3200, false),
('Гайд по студенческой визе', 'Пошаговая инструкция по получению визы: от сбора документов до интервью.', 'Виза', '#', false, 500, true),
('Шаблоны рекомендаций', 'Готовые тексты для учителей на английском языке.', 'Документы', '#', false, 900, false);
