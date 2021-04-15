/**
 * Super simple store. I'd use MongoDB or SQL were
 * the application more complex and time wasn't a factor. :)
 */

const getUuid = require('uuid-by-string');

/**
 * Little utility function to sum up seen values
 * @param {Array} numArray
 */
function sum(numArray) {
  return numArray.reduce((sum, num) => sum + num, 0);
}

module.exports = function store() {
  const db = {};

  /**
   * Hashes the supplied string for faster searches if the
   * strings start to get super long or complex
   * @param {String} str
   */
  const encodeString = str => getUuid(str.trim(), 5);

  /**
   * Shorthand for obj.hasOwnProperty()
   * @param {String | UUID} index
   */
  const has = index => db.hasOwnProperty(index);

  /**
   * Return all the things!
   * @return {Object}
   */
  const getAll = async () => ({ ...db, total: sum(Object.values(db)) });

  /**
   * If we have the string return seen count else 0
   * @param {String} str
   */
  const get = async str => {
    const index = encodeString(str);
    return has(index) ? db[index] : 0;
  };

  /**
   * If we have seen this string before increment the seen count,
   * otherwise create a new record of the string and set its seen count to 1.
   * @param {String} str
   * @return {Object}
   */
  const insertOrUpdate = async str => {
    const index = encodeString(str);
    const exists = has(index);

    // we've seen this string before, so increment seen count
    if (exists) db[index] = parseInt(db[index], 10) + 1;

    // new string, add it to the db
    if (!exists) db[index] = 1;

    return { [index]: db[index] };
  };

  return {
    encodeString,
    get,
    getAll,
    insertOrUpdate,
  };
};
