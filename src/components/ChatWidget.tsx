'use client'

import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface UIMessage {
    id: string
    role: string
    content: string
}

interface ChatHelpers {
    messages: UIMessage[]
    input: string
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    isLoading: boolean
}

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat() as unknown as ChatHelpers
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-900/20 to-purple-900/20 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white flex items-center gap-2">
                                        Zertte AI <Sparkles className="w-3 h-3 text-yellow-400" />
                                    </h3>
                                    <p className="text-xs text-blue-300">Ваш помощник по поступлению</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.length === 0 && (
                                <div className="text-center mt-10 opacity-60">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        Привет! Я могу помочь найти университет, подобрать документы или ответить на вопросы по визе.
                                    </p>
                                </div>
                            )}

                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20'
                                            : 'bg-white/10 text-gray-100 rounded-tl-none border border-white/5'
                                            }`}
                                    >
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                                        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/20">
                            <div className="relative flex items-center">
                                <input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Спросите что-нибудь..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input?.trim()}
                                    className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-lg transition-all shadow-lg shadow-blue-900/20"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(37,99,235,0.7)] transition-all border border-white/20 z-50"
            >
                {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-7 h-7 text-white" />}
            </motion.button>
        </div>
    )
}
