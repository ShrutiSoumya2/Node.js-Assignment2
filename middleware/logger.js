const logger = (req, res, next) => {
  console.log(new Date().toISOString());
  console.log(req.method);
  console.log(req.url);
  next();
};

module.exports = logger;