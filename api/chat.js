export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // 🔐 TOKEN VERIFICATION - REPLACE WITH YOUR BOTPENGUIN TOKEN
  const EXPECTED_TOKEN = 'YOUR_BOTPENGUIN_WEBHOOK_TOKEN_HERE';
  
  // Check for token in different possible locations
  const authHeader = req.headers.authorization;
  const apiKeyHeader = req.headers['x-api-key'];
  const tokenFromBody = req.body?.token;
  
  const receivedToken = authHeader?.replace('Bearer ', '') || apiKeyHeader || tokenFromBody;
  
  // If BotPenguin requires token verification, uncomment this:
  /*
  if (receivedToken !== EXPECTED_TOKEN) {
    return res.status(401).json({ 
      reply: "Unauthorized: Invalid token",
      error: true
    });
  }
  */
  
  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ 
          reply: "No message provided",
          error: true
        });
      }
      
      console.log('Received message:', message);
      
      // ✅ TEMPORARY: Simple response until we connect AgentX
      return res.status(200).json({ 
        reply: `✅ Bridge working! Token received: ${receivedToken ? 'YES' : 'NO'}. Message: "${message}"`
      });
      
      /* 
      // ✅ LATER: Replace with AgentX API call
      const agentxResponse = await fetch('YOUR_AGENTX_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'YOUR_AGENTX_API_TOKEN_HERE', // AgentX token
        },
        body: JSON.stringify({ message: message })
      });
      
      const data = await agentxResponse.json();
      const agentReply = data.reply || data.response || 'No response from agent';
      
      return res.status(200).json({ reply: agentReply });
      */
      
    } catch (error) {
      console.error('Error:', error);
      return res.status(200).json({ 
        reply: "I'm having trouble connecting right now. Please try again.",
        error: true
      });
    }
  }
  
  return res.status(404).json({ 
    error: 'Use POST method instead of GET',
    example: 'curl -X POST https://your-app.vercel.app/api/chat -H "Content-Type: application/json" -H "Authorization: Bearer YOUR_TOKEN" -d \'{"message":"hello"}\''
  });
}
