module.exports = async (req, res) => {
  const title = (req.query.title || 'Campaign').toString();
  const message = (req.query.message || '').toString();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify({ ok: true, provider: 'demo', title, message }));
};


