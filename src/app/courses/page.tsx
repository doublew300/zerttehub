import { createClient } from '@/lib/supabase';
import CourseCard from '@/components/courses/CourseCard';
import AppSidebar from '@/components/layout/AppSidebar';
import Navbar from '@/components/Navbar'; // Keep Navbar for mobile or top nav

// MOCK DATA for now, as migration cannot be applied to remote without user token
const MOCK_COURSES = [
    {
        id: '1',
        title: 'Полное руководство по поступлению в США',
        slug: 'usa-guide',
        description: 'Все этапы поступления: от выбора вуза до получения визы. Примеры эссе, подготовка к интервью.',
        thumbnail_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
        instructor: { full_name: 'Айгерим К.' },
        is_published: true,
        price: 25000,
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        title: 'IELTS Band 8.0: Стратегии и Практика',
        slug: 'ielts-mastery',
        description: 'Интенсивный курс подготовки к IELTS. Разбор всех секций, шаблоны для Writing и Speaking.',
        thumbnail_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800',
        instructor: { full_name: 'Джон Д.' },
        is_published: true,
        price: 15000,
        created_at: new Date().toISOString()
    },
    {
        id: '3',
        title: 'Турция: Гранты Türkiye Bursları',
        slug: 'turkiye-burslari',
        description: 'Как выиграть полное финансирование на обучение в Турции. Пошаговый план.',
        thumbnail_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800',
        instructor: { full_name: 'Елдос М.' },
        is_published: true,
        price: 0,
        created_at: new Date().toISOString()
    }
];

export default async function CoursesPage() {
    const supabase = createClient();

    // Try to fetch real courses, if fail (due to missing table), use mock
    let courses = [];
    try {
        const { data, error } = await supabase.from('courses').select('*, instructor:users(full_name)');
        if (!error && data) {
            courses = data;
        } else {
            console.warn('Using Mock Data due to DB error:', error?.message);
            courses = MOCK_COURSES;
        }
    } catch (e) {
        courses = MOCK_COURSES;
    }

    // If DB is empty but valid, also show mock for demo? 
    // Maybe better to show empty state. But for user demo, let's mix.
    if (courses.length === 0) courses = MOCK_COURSES;

    return (
        <div className="min-h-screen bg-[var(--color-background)] flex flex-col md:flex-row">
            <AppSidebar />

            <main className="flex-1 md:ml-64 relative">
                <div className="md:hidden">
                    <Navbar />
                </div>

                <div className="p-8 pt-24 md:pt-8">
                    <div className="mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">Каталог курсов</h1>
                        <p className="text-gray-400 max-w-2xl">
                            Выберите образовательную программу, которая поможет вам достичь вашей цели.
                            Доступ к материалам 24/7.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {courses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>

                {/* Background Elements */}
                <div className="fixed top-0 left-64 right-0 h-96 bg-blue-900/10 blur-[100px] -z-10 pointer-events-none" />
            </main>
        </div>
    );
}
