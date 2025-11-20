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
    const { messages, visitorInfo } = JSON.parse(event.body)

    if (!messages) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing messages' })
      }
    }

    // Generar ID de visitant si no existeix
    const visitorId = visitorInfo?.id || `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Guardar conversa
    const { data, error } = await supabase
      .from('conversations')
      .insert([
        {
          visitor_id: visitorId,
          visitor_name: visitorInfo?.name || null,
          visitor_email: visitorInfo?.email || null,
          visitor_phone: visitorInfo?.phone || null,
          visitor_address: visitorInfo?.address || null,
          interested_packages: visitorInfo?.packages || [],
          budget_total: visitorInfo?.budget || null,
          messages: messages,
          status: 'active'
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
        conversation_id: data[0].id
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
