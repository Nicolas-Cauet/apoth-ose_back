const APIError = require(`../handlers/APIError`);
const { dataMapperReporting } = require(`../models/dataMapper/index`);
const debug = require(`debug`)(`adminReportingController`);

/**
 * @type {object}
 * @export adminReportingController
 * @namespace adminReportingController
 */
const adminReportingController = {
  /**
   * The method returns all administrator reports
   * @menberof adminReportingController
   * @method allReporting
   * @param {Object} req
   * @param {Object} res
   * @returns Return all reports Administrator
   */
  async allReporting(req, res) {
    if (parseInt(req.params.town_hall_id, 10) !== req.admin.town_hall_id) {
      throw new APIError(`Vous n'avez pas accès à cette page !`);
    }
    const Allreporting = await dataMapperReporting.getAllReport(
      req.params.town_hall_id,
    );
    if (Allreporting) {
      res.json(Allreporting).status(200);
    } else {
      throw new APIError(`Impossible de récupérer les signalements`);
    }
  },
  /**
   * The method returns all visitor reports
   * @menberof adminReportingController
   * @method allReportingVisitor
   * @param {Object} req
   * @param {Object} res
   * @returns Return all reports visitor
   */
  async allReportingVisitor(req, res) {
    // eslint-disable-next-line max-len
    const reportings = await dataMapperReporting.getAllReportVisitor(
      parseInt(req.params.town_hall_id, 10),
    );
    if (reportings) {
      res.json(reportings).status(200);
    } else {
      throw new APIError(`Impossible de récupérer les signalements`);
    }
  },
  /**
   * The method returns one reports
   * @menberof adminReportingController
   * @method oneReporting
   * @param {Object} req
   * @param {Object} res
   * @returns Return one reports visitor
   */
  async oneReporting(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new APIError(`Vous n'avez pas accès à cette page !`);
    }
    const report = await dataMapperReporting.getOneReport(
      req.params.reporting_id,
    );
    if (report) {
      res.json(report).status(200);
    }
    throw new APIError(`Impossible de récupérer le signalement`);
  },
  /**
   * The method allows you to delete a report
   * @menberof adminReportingController
   * @method deleteReporting
   * @param {Object} req
   * @param {Object} res
   * @returns void
   */
  async deleteReporting(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new APIError(`Vous n'avez pas accès à cette page !`);
    }
    const report = await dataMapperReporting.deleteReport(
      req.params.reporting_id,
    );
    if (report.rowCount) {
      res.status(200).send(`Le signalement est bien supprimer !`);
    } else {
      throw new APIError(`La mise à jour n'est pas possible !`);
    }
  },
  /**
   * The method allows you to modify a report
   * @menberof adminReportingController
   * @method modifyReporting
   * @param {Object} req
   * @param {Object} res
   * @returns void
   */
  async modifyReporting(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new APIError(`Impossible de supprimer le signalement !`);
    }
    const values = {
      admin_text: req.body.admin_text,
      reporting_statut: req.body.reporting_statut,
      reporting_id: req.params.reporting_id,
    };
    console.log(values);
    const report = await dataMapperReporting.modifyReport(values);
    if (report.rowCount) {
      res.status(200).send(`La mise à jour est bien passée.`);
    } else {
      throw new APIError(`La mise à jour n'est pas possible !`);
    }
  },
  /**
   * The method allows you to post a report as a visitor
   * @menberof adminReportingController
   * @method postReporting
   * @param {Object} req
   * @param {Object} res
   * @returns void
   */
  async postReporting(req, res) {
    const values = {
      title: req.body.title,
      email: req.body.email,
      phonenumber: req.body.phonenumber,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_text: req.body.user_text,
      user_image: req.body.user_image,
      reporting_category: req.body.reporting_category,
      user_ip: req.headers[`x-forwarded-for`]?.split(`,`).shift()
      || req.socket?.remoteAddress,
      town_hall_id: req.params.town_hall_id,
    };
    const report = await dataMapperReporting.postReport(values);
    if (report.rowCount) {
      res.status(200).send(`Votre signalement est effectué !`);
    } else {
      throw new APIError(`Votre signalement ne peut pas être effectué !`);
    }
  },
};

module.exports = adminReportingController;
