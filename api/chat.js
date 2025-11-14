export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    const { message } = req.body;
    return res.status(200).json({ 
      reply: `✅ SUCCESS! Received: ${message || 'no message'}` 
    });
  }
  
  // Return 404 for GET requests to make debugging obvious
  return res.status(404).json({ 
    error: 'Use POST method instead of GET',
    example: 'curl -X POST https://your-app.vercel.app/api/chat -H "Content-Type: application/json" -d \'{"message":"hello"}\''
  });
}
