require(`dotenv`).config();
const jwt = require(`jsonwebtoken`);
const APIError = require(`../handlers/APIError`);

/**
 * The method allows you to check if you are recovering a token or not
 * @method authenticateToken
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @returns {void}
 */
const authenticateToken = (req, res, next) => {
<<<<<<< HEAD
  console.log(req.headers.common);
  console.log(req.body);
=======
  console.log(req.headers);
  console.log(req);
>>>>>>> develop
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader && authHeader.split(` `)[1];
  if (token == null) res.sendStatus(401).send('PAS DE TOKEN !!!');
  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403);
    req.admin = user;
    next();
  });
};

module.exports = authenticateToken;
