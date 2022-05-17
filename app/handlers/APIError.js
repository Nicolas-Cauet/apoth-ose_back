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
    // Gestion de l'affichage de l'erreur dans la console - instantanéité
    console.error(this.url, this.message, this.status, new Date());
  }
}

module.exports = APIError;
