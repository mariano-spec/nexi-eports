import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase credentials not configured')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { visitorId, userMessage, assistantMessage } = JSON.parse(event.body)

    if (!visitorId || !userMessage || !assistantMessage) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      }
    }

    // ✅ OPTIMITZACIÓ: Insertar INDIVIDUAL messages, no una conversa géant
    // Això és molt més eficient en termes de bandwidth i emmagatzematge
    const { data, error } = await supabase
      .from('conversation_messages')
      .insert([
        {
          visitor_id: visitorId,
          user_message: userMessage,
          assistant_message: assistantMessage,
          timestamp: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      throw new Error(`Supabase error: ${error.message}`)
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        message_id: data[0].id
      })
    }

  } catch (error) {
    console.error('Error saving conversation:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error saving conversation',
        message: error.message
      })
    }
  }
}
