'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchInput() {
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('search', term)
        } else {
            params.delete('search')
        }
        replace(`/universities?${params.toString()}`)
    }, 300)

    return (
        <div className="relative mb-6 group">
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-xl leading-5 bg-slate-900/60 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 sm:text-sm backdrop-blur-xl transition-all shadow-inner hover:bg-slate-900/80"
                placeholder="Поиск по названию..."
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('search')?.toString()}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
            </div>
        </div>
    )
}
