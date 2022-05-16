const APIError = require(`./APIError`);

/**
 * @method handleError
 * @param {Object} err
 * @param {Objetc} req
 * @param {Object} res
 * @returns {String} Returns error message
 */
const handleError = async (err, req, res) => {
  let myError;
  if (err instanceof APIError) {
    myError = err;
  } else {
    myError = new APIError(err, req.url);
  }
  await myError.log();

  res.status(myError.status).json(myError.message);
};

module.exports = handleError;