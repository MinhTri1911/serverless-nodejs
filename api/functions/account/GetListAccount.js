import { AccountBussiness } from "../../bussiness/AccountBussiness";
import ServiceModel from "../../lib/ServicesModel";
import ServiceModelConfig from "../../config/Database";

const getListAccount = async (event, context, callback) => {
  let service = new ServiceModel(ServiceModelConfig);
  let account = new AccountBussiness(service.getDb());

  try {
    return account.getAccounts()
      .then(res => {
        return service.createSuccessCallback(
          res.code,
          res.result,
          callback
        );
      })
      .catch(err => {
        return service.createErrorCallback(
          500,
          "Internal Server Error!!!",
          callback
        );
      });
  } catch (err) {
    return service.createErrorCallback(
      500,
      "Internal Server Error!!!",
      callback
    );
  }
}

export { getListAccount }
