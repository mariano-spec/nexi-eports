import fetch from 'node-fetch'

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
  throw new Error('Airtable credentials not configured')
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { name, email, phone, address, packages, totalPrice, mobileLinesCount, conversationId } = JSON.parse(event.body)

    if (!name || !phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: name, phone' })
      }
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              'Name': name,
              'Email': email || '',
              'Phone': phone,
              'Address': address || '',
              'Interested_Packages': packages || [],
              'Total_Monthly_Price': totalPrice || 0,
              'Mobile_Lines': mobileLinesCount || 0,
              'Status': 'New',
              'Created_Date': new Date().toISOString().split('T')[0],
              'NEXI_Conversation_ID': conversationId || ''
            }
          }
        ]
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Airtable error:', error)
      throw new Error(`Airtable error: ${response.status}`)
    }

    const data = await response.json()

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        lead_id: data.records[0].id
      })
    }

  } catch (error) {
    console.error('Error saving lead:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error saving lead',
        message: error.message
      })
    }
  }
}
