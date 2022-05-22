require(`dotenv`).config();
const jwt = require(`jsonwebtoken`);

/**
 * The method allows you to check if you are recovering a token or not
 * @method authenticateToken
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {String} Returns administrator id
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(` `)[1];
  if (token == null) {
    const err = new Error(`Pas de token merci de vous reconnecter !`);
    err.status = 401;
    next(err);
  }
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (error, user) => {
    if (error) {
      const err = new Error(`Vous n'avez pas les droits requis pour faire cette action car votre token a expiré merci de vous reconnecter !`);
      err.status = 401;
      next(err);
    }
    req.admin = user;
    next();
  });
};

module.exports = authenticateToken;
