import Link from 'next/link'

import HeroSection from '@/components/sections/HeroSection'
import UniversityCard from '@/components/UniversityCard'
import BenefitsSection from '@/components/sections/BenefitsSection'
import RoadmapSection from '@/components/sections/RoadmapSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import { createClient } from '@/lib/supabase'



export default async function Home() {
  const supabase = createClient()

  // Fetch featured universities (e.g., those with grants or just random 6)
  const { data: universities } = await supabase
    .from('universities')
    .select('*')
    .or('cost_description.ilike.%бесплатно%,cost_description.ilike.%стипендия%,cost_description.ilike.%grant%')
    .limit(6)

  const displayUniversities = universities || []

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Trust Bar */}
      <BenefitsSection />

      {/* Roadmap Section */}
      <RoadmapSection />

      {/* Featured Universities */}
      <section className="py-16 px-4 pt-32 -mt-24 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">50+ вузов с грантами</h2>
              <p className="text-gray-400">Лучшие предложения для казахстанцев</p>
            </div>
            <Link href="/universities" className="text-blue-400 font-semibold hover:text-blue-300 hidden md:block">
              Смотреть все &rarr;
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {displayUniversities.map((uni, index) => (
              <UniversityCard key={uni.slug} university={uni} index={index} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/universities" className="text-blue-400 font-semibold hover:text-blue-300">
              Смотреть все &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-700 to-blue-600 relative overflow-hidden text-white text-center">
        {/* Decorative Blobs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-lg">Готов начать свой путь?</h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Получи персональный план поступления и сэкономь время и нервы.
          </p>
          <Link href="/get-plan" className="inline-block bg-[var(--color-kz-gold)] text-[var(--color-kz-blue)] px-12 py-5 rounded-full font-bold text-xl hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:scale-105 hover:shadow-[0_0_30px_rgba(250,204,21,0.6)]">
            Получить план за 20 000 ₸
          </Link>
        </div>
      </section>
    </div>
  )
}
