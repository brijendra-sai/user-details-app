const moment = require("moment");

//Logs all requests in the console
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${req.originalUrl}(${
      req.method
    }) [${moment().format()}]`
  );
  next();
};

module.exports = logger;
