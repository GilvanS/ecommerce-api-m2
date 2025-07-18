// middleware/authInternal.js
module.exports = (req, res, next) => {
  const apiKey = req.get("x-internal-api-key");
  if (!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
    return res
      .status(401)
      .json({
        error: {
          code: "UNAUTHORIZED",
          message: "Chave de API interna inválida ou ausente.",
        },
      });
  }
  next();
};
