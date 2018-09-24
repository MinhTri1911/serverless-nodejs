import { AccountBussiness } from "../../bussiness/AccountBussiness";
import ServiceModel from "../../lib/ServicesModel";
import ServiceModelConfig from "../../config/Database";
import jwt from "jsonwebtoken";

const JWT_EXPIRATION_TIME = '30m';

const register = async (event, context, callback) => {
	let serviceModel = new ServiceModel(ServiceModelConfig);
  let account = new AccountBussiness(serviceModel.getDb());

  try {
    let req = JSON.parse(event.body);

    return account.createAccount({
        client_id: req.clientId,
        account_id: req.accountId,
        account_password: req.password,
        account_nm: 'テスト太郎',
        account_kn: 'テストタロウ',
        mail_address: req.mail,
        apply_start_date: '20180921',
        apply_end_date: '20180921',
        enable_kb: 1,
        notes: '',
        permission_group_no: 4,
        ins_pg_id: 'copy',
        ins_client_id: 'test',
        ins_employee_cd: 'copy',
        ins_dtime: '2018-09-21 08:01:00.595215',
        upd_pg_id: 'copy',
        upd_client_id: 'TriHNM_1',
        upd_employee_cd: 'copy',
        upd_dtime: '2018-09-21 08:01:00.595215'
      })
      .then(data => {
        let infoUser = data.result;
        const token = jwt.sign(infoUser, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });

        return serviceModel.createSuccessCallback(
          data.code,
          token,
          callback
        );
      })
      .catch(err => {
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

export { register };
