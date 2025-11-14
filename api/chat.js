module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Handle POST
  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'No message provided' });
      }
      
      // Simple test response
      return res.status(200).json({ 
        reply: `✅ Bridge working! Received: "${message}"` 
      });
      
    } catch (error) {
      return res.status(500).json({ error: 'Server error' });
    }
  }
  
  // Handle other methods
  return res.status(405).json({ error: 'Method not allowed' });
};
