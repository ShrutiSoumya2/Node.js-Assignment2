const logger = (req, res, next) => {
  console.log(new Date().toLocaleString());
  console.log(req.method);
  console.log(req.url);
  next();
};

module.exports = logger;