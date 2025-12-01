-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  is_premium boolean default false,
  preferred_language text default 'ru',
  progress jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for users
alter table public.users enable row level security;

create policy "Users can view their own data" on public.users
  for select using (auth.uid() = id);

create policy "Users can update their own data" on public.users
  for update using (auth.uid() = id);

-- Universities table
create table public.universities (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  country text not null,
  city text not null,
  cost_description text,
  ielts_score numeric,
  flag_emoji text,
  scholarship_info text,
  details_json jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for universities (public read)
alter table public.universities enable row level security;

create policy "Universities are viewable by everyone" on public.universities
  for select using (true);

-- Checklists table
create table public.checklists (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  file_url text,
  is_free boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for checklists (public read, but maybe restricted in app logic)
alter table public.checklists enable row level security;

create policy "Checklists are viewable by everyone" on public.checklists
  for select using (true);

-- Insert Mock Data for Universities (50 items)
insert into public.universities (name, country, city, cost_description, ielts_score, flag_emoji, slug) values
('Koç University', 'Турция', 'Стамбул', 'Полная стипендия YTB', 6.0, '🇹🇷', 'koc-university'),
('Charles University', 'Чехия', 'Прага', 'Бесплатно', 6.0, '🇨🇿', 'charles-university'),
('University of Warsaw', 'Польша', 'Варшава', 'до 1 500 000 тг', 6.0, '🇵🇱', 'warsaw-university'),
('Middle East Technical University', 'Турция', 'Анкара', '500-1000 USD', 6.0, '🇹🇷', 'metu'),
('Jagiellonian University', 'Польша', 'Краков', '2000-3000 EUR', 6.0, '🇵🇱', 'jagiellonian'),
('Eötvös Loránd University', 'Венгрия', 'Будапешт', 'Stipendium Hungaricum', 5.5, '🇭🇺', 'elte'),
('University of Debrecen', 'Венгрия', 'Дебрецен', 'Stipendium Hungaricum', 5.5, '🇭🇺', 'debrecen'),
('Sapienza University of Rome', 'Италия', 'Рим', 'DSU Scholarship', 6.0, '🇮🇹', 'sapienza'),
('University of Bologna', 'Италия', 'Болонья', 'DSU Scholarship', 6.0, '🇮🇹', 'bologna'),
('Technical University of Munich', 'Германия', 'Мюнхен', 'Бесплатно (семестровый взнос)', 6.5, '🇩🇪', 'tum'),
('RWTH Aachen University', 'Германия', 'Ахен', 'Бесплатно (семестровый взнос)', 6.5, '🇩🇪', 'rwth-aachen'),
('University of Vienna', 'Австрия', 'Вена', '750 EUR/sem', 6.0, '🇦🇹', 'vienna-university'),
('KU Leuven', 'Бельгия', 'Лёвен', '1000-4000 EUR', 6.5, '🇧🇪', 'ku-leuven'),
('University of Amsterdam', 'Нидерланды', 'Амстердам', '10000+ EUR', 6.5, '🇳🇱', 'uva'),
('Lund University', 'Швеция', 'Лунд', 'Бесплатно (для EU, платно для KZ)', 6.5, '🇸🇪', 'lund'),
('University of Tartu', 'Эстония', 'Тарту', 'Бесплатно (есть стипендии)', 6.0, '🇪🇪', 'tartu'),
('Vilnius University', 'Литва', 'Вильнюс', '2000-5000 EUR', 5.5, '🇱🇹', 'vilnius'),
('Riga Technical University', 'Латвия', 'Рига', '2000-4000 EUR', 5.5, '🇱🇻', 'rtu'),
('University of Ljubljana', 'Словения', 'Любляна', '2000-3000 EUR', 6.0, '🇸🇮', 'ljubljana'),
('Comenius University', 'Словакия', 'Братислава', 'Бесплатно (на словацком)', 5.5, '🇸🇰', 'comenius'),
('University of Zagreb', 'Хорватия', 'Загреб', '1000-3000 EUR', 5.5, '🇭🇷', 'zagreb'),
('University of Belgrade', 'Сербия', 'Белград', '1000-3000 EUR', 5.5, '🇷🇸', 'belgrade'),
('Sofia University', 'Болгария', 'София', '1000-3000 EUR', 5.5, '🇧🇬', 'sofia'),
('University of Bucharest', 'Румыния', 'Бухарест', '2000-4000 EUR', 5.5, '🇷🇴', 'bucharest'),
('Aristotle University of Thessaloniki', 'Греция', 'Салоники', '1000-2000 EUR', 5.5, '🇬🇷', 'auth'),
('University of Cyprus', 'Кипр', 'Никосия', '3000-6000 EUR', 5.5, '🇨🇾', 'ucy'),
('Sabanci University', 'Турция', 'Стамбул', 'Частичные гранты', 6.0, '🇹🇷', 'sabanci'),
('Bilkent University', 'Турция', 'Анкара', 'Частичные гранты', 6.0, '🇹🇷', 'bilkent'),
('Boğaziçi University', 'Турция', 'Стамбул', 'Бесплатно (гос)', 6.0, '🇹🇷', 'bogazici'),
('Istanbul Technical University', 'Турция', 'Стамбул', 'Бесплатно (гос)', 6.0, '🇹🇷', 'itu'),
('Hacettepe University', 'Турция', 'Анкара', 'Бесплатно (гос)', 6.0, '🇹🇷', 'hacettepe'),
('Ankara University', 'Турция', 'Анкара', 'Бесплатно (гос)', 5.5, '🇹🇷', 'ankara'),
('Ege University', 'Турция', 'Измир', 'Бесплатно (гос)', 5.5, '🇹🇷', 'ege'),
('Dokuz Eylül University', 'Турция', 'Измир', 'Бесплатно (гос)', 5.5, '🇹🇷', 'dokuz-eylul'),
('Marmara University', 'Турция', 'Стамбул', 'Бесплатно (гос)', 5.5, '🇹🇷', 'marmara'),
('Yildiz Technical University', 'Турция', 'Стамбул', 'Бесплатно (гос)', 5.5, '🇹🇷', 'yildiz'),
('Gazi University', 'Турция', 'Анкара', 'Бесплатно (гос)', 5.5, '🇹🇷', 'gazi'),
('Akdeniz University', 'Турция', 'Анталья', 'Бесплатно (гос)', 5.5, '🇹🇷', 'akdeniz'),
('Cukurova University', 'Турция', 'Адана', 'Бесплатно (гос)', 5.5, '🇹🇷', 'cukurova'),
('Erciyes University', 'Турция', 'Кайсери', 'Бесплатно (гос)', 5.5, '🇹🇷', 'erciyes'),
('Selcuk University', 'Турция', 'Конья', 'Бесплатно (гос)', 5.5, '🇹🇷', 'selcuk'),
('Uludag University', 'Турция', 'Бурса', 'Бесплатно (гос)', 5.5, '🇹🇷', 'uludag'),
('Ondokuz Mayis University', 'Турция', 'Самсун', 'Бесплатно (гос)', 5.5, '🇹🇷', 'omu'),
('Sakarya University', 'Турция', 'Сакарья', 'Бесплатно (гос)', 5.5, '🇹🇷', 'sakarya'),
('Kocaeli University', 'Турция', 'Коджаэли', 'Бесплатно (гос)', 5.5, '🇹🇷', 'kocaeli'),
('Pamukkale University', 'Турция', 'Денизли', 'Бесплатно (гос)', 5.5, '🇹🇷', 'pamukkale'),
('Mersin University', 'Турция', 'Мерсин', 'Бесплатно (гос)', 5.5, '🇹🇷', 'mersin'),
('Canakkale Onsekiz Mart University', 'Турция', 'Чанаккале', 'Бесплатно (гос)', 5.5, '🇹🇷', 'comu'),
('Balikesir University', 'Турция', 'Балыкесир', 'Бесплатно (гос)', 5.5, '🇹🇷', 'balikesir'),
('Mugla Sitki Kocman University', 'Турция', 'Мугла', 'Бесплатно (гос)', 5.5, '🇹🇷', 'msku');

-- Insert Mock Data for Checklists
insert into public.checklists (title, description, file_url, is_free) values
('Чек-лист по документам', 'Список всех необходимых документов для поступления', 'https://example.com/doc1.pdf', true),
('Гайд по мотивационному письму', 'Как написать идеальное письмо', 'https://example.com/doc2.pdf', false),
('Подготовка к IELTS', 'План подготовки на 3 месяца', 'https://example.com/doc3.pdf', false),
('Стипендии Турции', 'Полный гид по YTB', 'https://example.com/doc4.pdf', false),
('Стипендии Венгрии', 'Полный гид по Stipendium Hungaricum', 'https://example.com/doc5.pdf', false),
('Стипендии Италии', 'Полный гид по DSU', 'https://example.com/doc6.pdf', false),
('Виза в Чехию', 'Инструкция по получению визы', 'https://example.com/doc7.pdf', false),
('Виза в Польшу', 'Инструкция по получению визы', 'https://example.com/doc8.pdf', false),
('Общежития', 'Как найти жилье', 'https://example.com/doc9.pdf', false),
('Бюджет студента', 'Сколько денег нужно на жизнь', 'https://example.com/doc10.pdf', false);
