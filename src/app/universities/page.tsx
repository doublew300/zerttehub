import { createClient } from '@/lib/supabase'
import UniversityCard from '@/components/UniversityCard'
import FilterSidebar from '@/components/FilterSidebar'
import SearchInput from '@/components/SearchInput'

export default async function UniversitiesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams
    const country = params.country as string
    const budget = params.budget as string
    const ielts = params.ielts as string
    const search = params.search as string

    const supabase = createClient()

    const COUNTRY_SLUG_MAP: Record<string, string> = {
        'turkey': 'Турция',
        'czech-republic': 'Чехия',
        'south-korea': 'Южная Корея',
        'germany': 'Германия',
        'china': 'Китай',
        'usa': 'США',
        'uk': 'Великобритания',
        'poland': 'Польша',
        'hungary': 'Венгрия',
        'malaysia': 'Малайзия',
        'japan': 'Япония',
        'singapore': 'Сингапур',
        'hong-kong': 'Гонконг',
    }

    let query = supabase.from('universities').select('*')

    if (country) {
        const dbCountryName = COUNTRY_SLUG_MAP[country.toLowerCase()] || country
        query = query.eq('country', dbCountryName)
    }

    if (ielts) {
        query = query.lte('ielts_score', parseFloat(ielts))
    }

    if (budget === 'free') {
        query = query.or('cost_description.ilike.%бесплатно%,cost_description.ilike.%стипендия%,cost_description.ilike.%grant%')
    }

    if (search) {
        query = query.ilike('name', `%${search}%`)
    }

    const { data: universities, error } = await query

    if (error) {
        console.error('Error fetching universities:', error)
    }

    const displayUniversities = universities || []

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Каталог университетов</h1>
                        <p className="text-gray-400">
                            Найдено: <span className="text-white font-bold">{displayUniversities.length}</span> университетов
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-[300px_1fr] gap-8">
                    <div className="md:col-span-1">
                        <SearchInput />
                        <FilterSidebar />
                    </div>

                    <div className="md:col-span-1">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayUniversities.map((uni, index) => (
                                <UniversityCard key={uni.id} university={uni} index={index} />
                            ))}
                        </div>

                        {displayUniversities.length === 0 && (
                            <div className="text-center py-20 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-3xl">🔍</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Ничего не найдено</h3>
                                <p className="text-gray-400 max-w-md mx-auto">
                                    Попробуйте изменить параметры фильтрации или поисковый запрос.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
