module.exports = async (req, res) => {
  try {
    // Accept CSP reports without logging sensitive data
    res.status(204).end();
  } catch {
    res.status(204).end();
  }
};


