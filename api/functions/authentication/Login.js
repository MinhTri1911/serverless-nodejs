import { AccountBussiness } from "../../bussiness/AccountBussiness";
import ServiceModel from "../../lib/ServicesModel";
import ServiceModelConfig from "../../config/Database";
import jwt from "jsonwebtoken";
import _ from 'lodash';

const JWT_EXPIRATION_TIME = '10m';

const login = async (event, context, callback) => {
  let serviceModel = new ServiceModel(ServiceModelConfig);
  let account = new AccountBussiness(serviceModel.getDb());

  let req = JSON.parse(event.body);

  try {
    return account.getUserByEmail(req)
      .then(data => {
        if (_.isEmpty(data.result)) {
          return serviceModel.createSuccessCallback(
            404,
            "Login Fail!!!",
            callback
          );
        }

        let infoUser = data.result[0].dataValues;
        let token = jwt.sign(infoUser, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });

        return serviceModel.createSuccessCallback(
          data.code,
          {token: token, infUser: infoUser},
          callback
        );
      })
      .catch(err => {
        console.log(err)
        return serviceModel.createErrorCallback(
          500,
          "Internal Server Error!!!",
          callback
        );
      });
  } catch (err) {
    return serviceModel.createErrorCallback(
      500,
      "Internal Server Error!!!",
      callback
    );
  }
}

export { login }
