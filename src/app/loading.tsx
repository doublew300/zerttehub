import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="text-gray-400 font-medium animate-pulse">Загрузка...</p>
            </div>
        </div>
    )
}
