export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { messages, systemPrompt } = JSON.parse(event.body)

    if (!messages || !systemPrompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing messages or systemPrompt' })
      }
    }

    const apiKey = process.env.VITE_CLAUDE_API_KEY
    if (!apiKey) {
      throw new Error('Claude API key not configured')
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPrompt,
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Claude API error:', error)
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data = await response.json()
    const assistantResponse = data.content[0].text

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        response: assistantResponse
      })
    }

  } catch (error) {
    console.error('Error in chat function:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error processing request',
        message: error.message
      })
    }
  }
}
