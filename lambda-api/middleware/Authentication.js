import _ from "lodash";
import jwt from "jsonwebtoken";
import policy from "./IAMPolicy";
import { LoginBusiness } from "../business/login/LoginBusiness";
import ServiceModel from "../models/ServiceModel";
import Constant from "../config/Constant";

/*
 * Returns a boolean whether or not a user is allowed to call a particular method
 * A user with scopes: ['pangolins'] can
 * call 'arn:aws:execute-api:ap-southeast-1::random-api-id/dev/GET/pangolins'
 * @param { Array } userScopes
 * @param { String } methodArn
 * @return boolean
 */
// const authorizeUser = (userScopes, methodArn) => {
//   const hasValidScope = _.some(userScopes, scope => _.endsWith(methodArn, scope));

//   return hasValidScope;
// };

/*
 * Check valid user
 */
const authenUser = async data => {
  let serviceModel = new ServiceModel(Constant.DatabaseConfig);
  let account = new LoginBusiness(serviceModel.getDb());
  let hasValidUser = false;

  await account
    .getUserByToken(data)
    .then(response => {
      if (response != "") {
        hasValidUser = true;
      } else {
        hasValidUser = false;
      }
    })
    .catch(err => {
      hasValidUser = false;
    });

  return hasValidUser;
};

/**
 * Authorizer functions are executed before your actual functions.
 * @method authorize
 * @param {String} event.authorizationToken - JWT
 * @throws Returns 401 if the token is invalid or has expired.
 * @throws Returns 403 if the token does not have sufficient permissions.
 * @return { Object } IAMPolicy
 */
const handler = async (event, context, callback) => {
  try {
    let decodeToken = "";
    let token_client = event.authorizationToken;
    if (token_client) {
      let decode = jwt.verify(token_client, process.env.JWT_SECRET);
      if (decode) {
        decodeToken = decode;
      }
    }

    // const isAllowed = authorizeUser(user.scopes, event.methodArn);
    let isAllowed = await authenUser(decodeToken);

    // Return an IAM policy document for the current endpoint
    let effect = isAllowed ? "Allow" : "Deny";
    let user = "";
    user = decodeToken ? decodeToken : "";
    let userId = "";
    userId = decodeToken.mail_address
      ? decodeToken.mail_address
      : decodeToken.account_id
        ? decodeToken.account_id
        : "";
    let authorizerContext = { user: JSON.stringify(user) };
    let policyDocument = policy.buildIAMPolicy(
      userId,
      effect,
      event.methodArn,
      authorizerContext
    );

    return policyDocument;
  } catch (err) {
    console.log(err);
    let effect = "Deny";
    let userId = "Not Authorizer";
    let authorizerContext = { user: JSON.stringify("") };
    let policyDocument = policy.buildIAMPolicy(
      userId,
      effect,
      event.methodArn,
      authorizerContext
    );

    return policyDocument;
  }
};

export { handler };
