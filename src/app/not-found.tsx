import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="text-center max-w-lg">
                <div className="text-9xl font-bold text-white/5 select-none mb-8">404</div>
                <h1 className="text-4xl font-bold mb-4">Страница не найдена</h1>
                <p className="text-gray-400 mb-8 text-lg">
                    Похоже, вы заблудились в кампусе. Этой страницы не существует или она была перемещена.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20"
                    >
                        <Home className="w-5 h-5 mr-2" />
                        На главную
                    </Link>
                    <Link
                        href="/universities"
                        className="flex items-center justify-center px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold transition-all"
                    >
                        <Search className="w-5 h-5 mr-2" />
                        В каталог
                    </Link>
                </div>
            </div>
        </div>
    )
}
