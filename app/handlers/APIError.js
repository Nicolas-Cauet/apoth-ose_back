class APIError extends Error {
  constructor(message, url, status = 500) {
    super(message); // super appelle le constructeur du parent
    this.status = status;
    this.url = url;
  }

  /**
   * Méthode pour logger les erreurs
   * @param {string} message d'erreur
   * @returns
   */
  async log() {
    console.error(this.url, this.message, new Date());
    // Gestion des fichiers de log - historique
  }
}

module.exports = APIError;
