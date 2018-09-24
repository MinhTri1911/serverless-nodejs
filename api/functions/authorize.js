import _ from 'lodash';
import jwt from 'jsonwebtoken';
import utils from '../lib/IAMPolicy';
import { AccountBussiness } from "../bussiness/AccountBussiness";
import ServiceModel from "../lib/ServicesModel";
import ServiceModelConfig from "../config/Database";

/*
 * Returns a boolean whether or not a user is allowed to call a particular method
 * A user with scopes: ['pangolins'] can
 * call 'arn:aws:execute-api:ap-southeast-1::random-api-id/dev/GET/pangolins'
 *
 */
const authorizeUser = (userScopes, methodArn) => {
  const hasValidScope = _.some(userScopes, scope => _.endsWith(methodArn, scope));

  return hasValidScope;
};

/*
 * Check valid user
 */
const authenUser = async (data) => {
  let serviceModel = new ServiceModel(ServiceModelConfig);
  let account = new AccountBussiness(serviceModel.getDb());
  let hasValidUser = false;

  await account.getUserByEmail(data)
    .then(response => {
      if (!_.isEmpty(response.result)) {
        hasValidUser = true;
      }
    })
    .catch(err => {
      hasValidUser = false;
    });

  return hasValidUser;
}

/**
  * Authorizer functions are executed before your actual functions.
  * @method authorize
  * @param {String} event.authorizationToken - JWT
  * @throws Returns 401 if the token is invalid or has expired.
  * @throws Returns 403 if the token does not have sufficient permissions.
  */
const handler = async (event, context, callback) => {
  const token = event.authorizationToken;

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = {
      accountId: decoded.account_id,
      clientId: decoded.client_id,
      password: decoded.account_password,
      mail: decoded.mail_address,
    }

    // const isAllowed = authorizeUser(user.scopes, event.methodArn);
    const isAllowed = await authenUser(user);

    // Return an IAM policy document for the current endpoint
    const effect = isAllowed ? 'Allow' : 'Deny';

    const userId = user.accountId;
    const authorizerContext = { user: JSON.stringify(user) };
    const policyDocument = utils.buildIAMPolicy(userId, effect, event.methodArn, authorizerContext);

    callback(null, policyDocument);
  } catch (err) {
    // Return a 401 Unauthorized response
    callback('Unauthorized');
  }
}

export { handler }
