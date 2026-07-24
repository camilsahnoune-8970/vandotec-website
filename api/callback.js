export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) return res.status(400).send('No code');

  const response = await fetch(
    'https://github.com/login/oauth/access_token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    }
  );
  const data = await response.json();
  const token = data.access_token;

  if (!token) return res.status(401).send('Auth failed');

  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html><html><body><script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(
          'authorization:github:success:{"token":"${token}","provider":"github"}',
          e.origin
        );
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })()
    </script></body></html>
  `);
}
