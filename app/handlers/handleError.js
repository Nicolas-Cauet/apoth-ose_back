const APIError = require(`./APIError`);

/**
 * @method handleError
 * @param {Object} err
 * @param {Objetc} req
 * @param {Object} res
 * @returns {String} Returns error message
 */
const handleError = async (req, res, err) => {
  console.log(`HEYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYyy`);
  let myError;
  if (err instanceof APIError) {
    myError = err;
  } else {
    myError = new APIError(err, req.url);
  }
  // myError c'est un instance APIERROR
  await myError.log();
  res.send(`coucou`);
  // res.status(myError.status).send(myError.message, `COUCOUCOUCOUCOUCO`);
};

module.exports = handleError;
