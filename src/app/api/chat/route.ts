import { google } from '@ai-sdk/google'
import { streamText, type CoreMessage } from 'ai'
import { getAIContext, constructSystemPrompt } from '@/lib/ai-context'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
    const { messages }: { messages: CoreMessage[] } = await req.json()

    // Fetch context
    const { universities, resources } = await getAIContext()

    // Construct System Prompt
    const systemPrompt = constructSystemPrompt(universities, resources)

    const result = streamText({
        model: google('gemini-1.5-flash'),
        system: systemPrompt,
        messages,
    })

    return result.toTextStreamResponse()
}
