const notFound = (req, res, next) => {
  const error = new Error(`404 Not found ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const error = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(error).json({
    message: err.message,
    success: false,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

module.exports = { errorHandler, notFound };