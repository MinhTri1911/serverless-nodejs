import Constant from "../config/Constant"

/**
 * Check exists client id from request of user
 *
 * @param {Event} req
 * @return {boolean}
 */
const checkExistsClientIdInRequest = function (req) {
  // When user pass param into post or get request
  if (req && (req.body || req.queryStringParameters)) {
    let param = null
    // When http request is get, request body is an object
    if (req.httpMethod && req.httpMethod == 'GET') {
      param = req.queryStringParameters
      // When http request is post, request body is json string
    } else if (req.httpMethod && req.httpMethod == 'POST') {
      param = JSON.parse(req.body)
    }
    // Check client id in request
    if (param && param.client_id) {
      return true
    }
  }
  return false
}

/**
 * Add to export handle common function
 * @type {*}
 */
const COMMON = {
  checkExistsClientIdInRequest
}

export default COMMON