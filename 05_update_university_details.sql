-- Update Turkey Universities
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Один из ведущих университетов Турции, предлагающий качественное образование на английском языке. Кампус расположен в живописном месте с развитой инфраструктурой.',
    'website', 'https://www.ku.edu.tr/en/',
    'programs', jsonb_build_array('Computer Engineering', 'Business Administration', 'Economics', 'International Relations', 'Medicine'),
    'requirements', jsonb_build_array('IELTS 6.0+', 'GPA 3.0/4.0', 'Motivation Letter', '2 Recommendation Letters', 'SAT (optional)')
)
WHERE country = 'Турция';

-- Update Czech Republic Universities
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Старейший и самый престижный университет в Чехии. Предлагает бесплатное обучение на чешском языке и платные программы на английском.',
    'website', 'https://cuni.cz/UKEN-1.html',
    'programs', jsonb_build_array('General Medicine', 'Computer Science', 'Finance', 'Humanities', 'Law'),
    'requirements', jsonb_build_array('Nostrification of Diploma', 'Czech Language B2 (for free tuition)', 'IELTS 6.0 (for English programs)', 'Entrance Exams')
)
WHERE country = 'Чехия';

-- Update Poland Universities
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Современный европейский университет с доступной стоимостью обучения и возможностью получения двойного диплома.',
    'website', 'https://en.uw.edu.pl/',
    'programs', jsonb_build_array('International Relations', 'Management', 'Psychology', 'Data Science', 'Architecture'),
    'requirements', jsonb_build_array('Apostilled School Certificate', 'IELTS 6.0+', 'Passport Copy', 'Application Fee Payment')
)
WHERE country = 'Польша';

-- Update Hungary Universities
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Университет с богатой историей и сильными исследовательскими программами. Популярен среди студентов благодаря стипендии Stipendium Hungaricum.',
    'website', 'https://u-szeged.hu/english',
    'programs', jsonb_build_array('Medicine', 'Dentistry', 'Pharmacy', 'Biology', 'Business Administration'),
    'requirements', jsonb_build_array('Stipendium Hungaricum Application', 'IELTS 5.5+', 'Medical Certificate', 'Entrance Exam (for Medicine)')
)
WHERE country = 'Венгрия';

-- Update Germany Universities
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Ведущий технический университет Германии, входящий в группу TU9. Известен своими инновациями и связями с индустрией.',
    'website', 'https://www.tum.de/en/',
    'programs', jsonb_build_array('Mechanical Engineering', 'Informatics', 'Electrical Engineering', 'Management', 'Physics'),
    'requirements', jsonb_build_array('German B2/C1 (for most programs)', 'Studienkolleg (if applicable)', 'IELTS 6.5+', 'Blocked Account (~11k EUR)')
)
WHERE country = 'Германия';

-- Update South Korea Universities
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Топовый университет Южной Кореи, лидер в области технологий и инноваций. Предлагает множество грантов для иностранных студентов.',
    'website', 'https://en.snu.ac.kr/',
    'programs', jsonb_build_array('Korean Language & Literature', 'Business Administration', 'Computer Science', 'Engineering', 'Media & Communication'),
    'requirements', jsonb_build_array('TOPIK Level 3+ or IELTS 6.0+', 'Personal Statement', 'Study Plan', 'Portfolio (for Arts)')
)
WHERE country = 'Южная Корея';

-- Update USA Universities (Generic for now as specific ones might vary greatly)
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Престижный американский университет с мировым именем. Предлагает широкие возможности для исследований и карьеры.',
    'website', 'https://www.usa.edu/',
    'programs', jsonb_build_array('Computer Science', 'Business', 'Liberal Arts', 'Engineering', 'Biotechnology'),
    'requirements', jsonb_build_array('SAT/ACT Scores', 'IELTS 6.5+ / TOEFL 80+', 'Common App Essay', 'Extracurricular Activities', 'Recommendation Letters')
)
WHERE country = 'США';

-- Update Kazakhstan Universities
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Ведущий национальный университет Казахстана. Обеспечивает качественное образование и активную студенческую жизнь.',
    'website', 'https://www.kaznu.kz/en/',
    'programs', jsonb_build_array('Information Systems', 'Finance', 'Law', 'International Relations', 'Petroleum Engineering'),
    'requirements', jsonb_build_array('UNT Certificate', 'IELTS (optional)', 'Interview', 'Medical Certificate 075')
)
WHERE country = 'Казахстан';

-- Update Malaysia Universities
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Ведущий исследовательский университет Малайзии. Предлагает доступное образование мирового уровня в тропическом климате.',
    'website', 'https://www.um.edu.my/',
    'programs', jsonb_build_array('Islamic Finance', 'Engineering', 'Information Technology', 'Hospitality Management', 'Biotechnology'),
    'requirements', jsonb_build_array('IELTS 5.5+', 'High School Diploma', 'Passport Copy', 'Medical Screening')
)
WHERE country = 'Малайзия';

-- Update Japan Universities
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Один из лучших университетов Азии. Известен своими передовыми исследованиями и уникальной академической культурой.',
    'website', 'https://www.u-tokyo.ac.jp/en/',
    'programs', jsonb_build_array('Robotics', 'Economics', 'Japanese Studies', 'Environmental Science', 'Physics'),
    'requirements', jsonb_build_array('EJU Exam', 'JLPT N2+ or IELTS 6.0+', 'Interview', 'Research Proposal')
)
WHERE country = 'Япония';

-- Update Singapore Universities
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Мировой лидер в области образования и исследований. Кампус мирового класса и возможности для стартапов.',
    'website', 'https://nus.edu.sg/',
    'programs', jsonb_build_array('Computer Science', 'Business Analytics', 'Engineering', 'Law', 'Medicine'),
    'requirements', jsonb_build_array('A-Levels or Equivalent', 'SAT/ACT', 'IELTS 7.0+', 'Outstanding Co-curricular Activities')
)
WHERE country = 'Сингапур';

-- Update China Universities
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Ведущий университет Китая, входящий в лигу C9. Предлагает множество стипендий правительства Китая (CSC).',
    'website', 'https://www.tsinghua.edu.cn/en/',
    'programs', jsonb_build_array('Chinese Language', 'International Trade', 'Computer Science', 'Civil Engineering', 'Architecture'),
    'requirements', jsonb_build_array('HSK 4+ (for Chinese programs)', 'IELTS 6.0+ (for English programs)', 'CSC Scholarship Application', 'Physical Examination Record')
)
WHERE country = 'Китай';

-- Update Specific Top Universities with more accurate data

-- MIT (if exists) or similar top tier
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Массачусетский технологический институт (MIT) — мировой лидер в области науки и техники. Известен своим инновационным подходом к обучению.',
    'website', 'https://www.mit.edu/',
    'programs', jsonb_build_array('Computer Science', 'Mechanical Engineering', 'Physics', 'Mathematics', 'Economics'),
    'requirements', jsonb_build_array('SAT 1500+', 'TOEFL 100+', 'Olympiad Achievements', 'Research Portfolio', 'Interview')
)
WHERE slug = 'massachusetts-institute-of-technology';

-- Harvard (if exists)
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Гарвардский университет — старейший вуз США. Член Лиги плюща, известный своими выпускниками-лидерами.',
    'website', 'https://www.harvard.edu/',
    'programs', jsonb_build_array('Law', 'Business', 'Medicine', 'Political Science', 'Psychology'),
    'requirements', jsonb_build_array('SAT 1500+', 'GPA 4.0', 'Leadership Experience', '3 Essays', 'Alumni Interview')
)
WHERE slug = 'harvard-university';

-- Stanford (if exists)
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Стэнфордский университет — сердце Кремниевой долины. Идеальное место для будущих предпринимателей и инноваторов.',
    'website', 'https://www.stanford.edu/',
    'programs', jsonb_build_array('Computer Science', 'Entrepreneurship', 'Engineering', 'Biology', 'Symbolic Systems'),
    'requirements', jsonb_build_array('SAT 1480+', 'Innovation Portfolio', 'Letters of Recommendation', 'Common App Essay')
)
WHERE slug = 'stanford-university';

-- NU (Nazarbayev University)
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'Назарбаев Университет — исследовательский университет международного уровня в Астане. Обучение ведется полностью на английском языке.',
    'website', 'https://nu.edu.kz/',
    'programs', jsonb_build_array('Computer Science', 'Robotics', 'Chemical Engineering', 'Economics', 'World Languages'),
    'requirements', jsonb_build_array('NUET Entrance Exam', 'IELTS 6.0 (no band < 5.0)', 'SAT (optional)', 'Motivation Letter')
)
WHERE slug = 'nazarbayev-university';

-- KAIST
UPDATE public.universities
SET details_json = jsonb_build_object(
    'description', 'KAIST — ведущий научно-технический вуз Кореи. Обучение на английском, щедрые стипендии для талантливых студентов.',
    'website', 'https://www.kaist.ac.kr/en/',
    'programs', jsonb_build_array('Aerospace Engineering', 'Bio and Brain Engineering', 'Industrial Design', 'Physics', 'Computing'),
    'requirements', jsonb_build_array('IELTS 6.5+', 'SAT/ACT/AP Scores', 'High School Transcripts', 'Recommendation Letter from Math/Science Teacher')
)
WHERE slug = 'kaist';
