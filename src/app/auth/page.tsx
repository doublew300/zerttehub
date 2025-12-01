'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AuthPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setMessage(null)

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${location.origin}/auth/callback`,
                    },
                })
                if (error) throw error
                setMessage('Проверьте почту для подтверждения регистрации!')
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                router.push('/dashboard')
                router.refresh()
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-black to-black z-0"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

            <div className="max-w-md w-full space-y-8 bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 relative z-10">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white tracking-tight">
                        {isSignUp ? 'Создать аккаунт' : 'Войти в систему'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        {isSignUp ? 'Уже есть аккаунт? ' : 'Нет аккаунта? '}
                        <button
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            {isSignUp ? 'Войти' : 'Зарегистрироваться'}
                        </button>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleAuth}>
                    <div className="space-y-4">
                        <div>
                            <input
                                type="email"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-white/10 placeholder-gray-500 text-white rounded-xl bg-black/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Email адрес"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-white/10 placeholder-gray-500 text-white rounded-xl bg-black/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/20 p-3 rounded-xl">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="text-green-400 text-sm text-center bg-green-900/20 border border-green-500/20 p-3 rounded-xl">
                            {message}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:-translate-y-0.5"
                        >
                            {isLoading && <Loader2 className="animate-spin h-5 w-5 mr-2" />}
                            {isSignUp ? 'Зарегистрироваться' : 'Войти'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
