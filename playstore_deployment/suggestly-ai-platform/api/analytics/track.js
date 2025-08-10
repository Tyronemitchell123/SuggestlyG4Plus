module.exports = async (req, res) => {
  try {
    // Accept POST/GET; no-op logging endpoint
    res.status(204).end();
  } catch (e) {
    res.status(204).end();
  }
};


