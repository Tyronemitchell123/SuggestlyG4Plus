module.exports = async (req, res) => {
  const name = (req.query.name || '').toString();
  const email = (req.query.email || '').toString();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify({ ok: true, provider: 'demo', name, email, url: 'https://calendly.com/' }));
};


