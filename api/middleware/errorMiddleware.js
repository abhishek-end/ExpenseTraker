const errorHandle = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    err: err.messages,
    stack: err.stack,
  });
};
module.exports = errorHandle;
