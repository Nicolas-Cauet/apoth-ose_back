const APIError = require(`../handlers/APIError`);
const client = require(`../models/dbClient`);
const stringSimilarity = require(`string-similarity`);
const debug = require(`debug`)(`compareString`);
const leoProfanity = require(`leo-profanity`);
const frenchBadwordsList = require(`french-badwords-list`);

leoProfanity.clearList();
leoProfanity.add(frenchBadwordsList.array);

const compareString = {
  async verifyString(req, res, next) {
    const stringUser = req.body.user_text;
    const id = req.params.town_hall_id;
    const noBadWords = leoProfanity.check(stringUser);

    if (noBadWords === true) {
      throw new APIError(`Les insultes ne sont pas accepter`);
    } else {
      const query = {
        text: `SELECT user_text FROM reporting WHERE town_hall_id = $1 AND created_at > CAST(NOW() AS DATE) - 1`,
        values: [id],
      };
      const allUserText = await client.query(query);

      const AllUserTextString = [` `];

      // eslint-disable-next-line no-restricted-syntax
      for (const rows of allUserText.rows) {
        AllUserTextString.push(rows.user_text);
      }
      const matches = stringSimilarity.findBestMatch(stringUser, AllUserTextString);
      console.log(matches);
      if (matches.bestMatch.rating > 0.8) {
        throw new APIError(`Le contenu du signalement est très similaire a un autre signalement`);
      } else {
        next();
      }
    }
  },

};

module.exports = compareString;
