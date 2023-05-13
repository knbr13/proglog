const allowedDomain = "https://match-with-spongebob.netlify.app";
const restrictAccess = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedDomain === origin) {
    next();
  } else {
    res.status(403).json({ error: "Access denied." });
  }
};

module.exports = { restrictAccess };
