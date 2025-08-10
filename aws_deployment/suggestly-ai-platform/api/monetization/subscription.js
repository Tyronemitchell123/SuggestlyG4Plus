const knownTiers = new Set(['starter', 'professional', 'enterprise']);

module.exports = async (req, res) => {
  const tier = (req.query.tier || '').toString().toLowerCase();
  const safeTier = knownTiers.has(tier) ? tier : 'starter';
  const target = `/suggestly-ai-platform/tiers/${safeTier}.html`;
  res.statusCode = 302;
  res.setHeader('Location', target);
  res.end();
};


