// helpers/validator.js

/**
 * Validasi field required di req.body
 * @param {Object} body - req.body
 * @param {Array} requiredFields - daftar field yang wajib ada
 * @returns {Array} - daftar field yang kosong/missing
 */
function validateRequired(body, requiredFields) {
  const missing = [];

  for (const field in requiredFields) {
    if (body[field] === undefined || body[field] === null || body[field] === "") {
      missing.push(requiredFields[field]); // ambil label
    }
  }

  return missing;
}

module.exports = { validateRequired };
