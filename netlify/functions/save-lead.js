export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    }
  }

  try {
    const { name, email, phone, address, packages, totalPrice, mobileLinesCount, conversationId } = JSON.parse(event.body)

    // Validar que al menos tenga nombre y teléfono
    if (!phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Phone number required' })
      }
    }

    const airtableToken = process.env.AIRTABLE_API_KEY
    const baseId = process.env.AIRTABLE_BASE_ID
    const tableName = process.env.AIRTABLE_TABLE_NAME

    if (!airtableToken || !baseId || !tableName) {
      throw new Error('Airtable credentials not configured')
    }

    const url = `https://api.airtable.com/v0/${baseId}/${tableName}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${airtableToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              'Name': name || 'Sin nombre',
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
      throw new Error(`Airtable ${response.status}`)
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
    console.error('Error saving lead:', error.message)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error saving lead',
        message: error.message
      })
    }
  }
}
