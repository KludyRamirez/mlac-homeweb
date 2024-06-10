const csurf = require("csurf");

const csrfProtection = csurf({ cookie: true });

const csrfErrorHandler = (err, req, res, next) => {
  if (err.code !== "EBADCSRFTOKEN") return next(err);

  res.status(403).send("Invalid CSRF token");
};

module.exports = {
  csrfProtection,
  csrfErrorHandler,
};
