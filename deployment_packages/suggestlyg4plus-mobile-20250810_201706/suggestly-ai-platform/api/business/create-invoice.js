module.exports = async (req, res) => {
  const amount = (req.query.amount || '0').toString();
  const description = (req.query.description || 'Invoice').toString();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify({
    ok: true,
    provider: 'demo',
    amount,
    description,
    url: '#'
  }));
};


