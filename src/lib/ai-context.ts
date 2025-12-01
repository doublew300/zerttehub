import { createClient } from '@supabase/supabase-js'

export async function getAIContext() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Fetch Universities
    const { data: universities } = await supabase
        .from('universities')
        .select('name, country, city, ielts_score, cost_description')
        .limit(20)

    // Fetch Resources
    const { data: resources } = await supabase
        .from('resources')
        .select('title, type, is_free, description')
        .limit(20)

    return {
        universities: universities || [],
        resources: resources || []
    }
}

export function constructSystemPrompt(universities: any[], resources: any[]) {
    return `
    You are "Zertte AI", an expert admission counselor for ZertteHub.kz.
    Your goal is to help students from Kazakhstan apply to foreign universities.

    Tone: Professional, encouraging, and helpful.
    Language: Russian (always reply in Russian unless asked otherwise).

    Here is the current database of universities we support:
    ${JSON.stringify(universities, null, 2)}

    Here are the available resources/checklists:
    ${JSON.stringify(resources, null, 2)}

    Rules:
    1. Only recommend universities from the list above.
    2. If a student asks for a document or checklist, check the resources list.
    3. If the answer is not in the data, say you don't know but suggest they check the "Universities" or "Checklists" tab.
    4. Keep answers concise and actionable.
    5. If asked about prices, mention that Premium access costs 20,000 T.
  `
}
