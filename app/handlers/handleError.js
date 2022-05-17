const APIError = require(`./APIError`);

const handleError = async (req, res, err) => {
  let myError;
  if (err instanceof APIError) {
    // err est il une instance d'APIError
    myError = err;
  } else {
    // si mon erreur n'est pas de type APIError, alors je la transforme
    myError = new APIError(err, req.url);
  }

  // gestion des logs pour la plateforme (pour nous)
  await myError.log();

  // gestion du retour utilisateur
  res.status(myError.status).send(myError.stack);
};

module.exports = handleError;
