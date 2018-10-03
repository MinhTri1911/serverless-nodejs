/**
 * File LoginControler.js
 * Define request and response in api login
 *
 * @author Rikkei.DucVN
 * @date 2018-10-02
 */

import { LoginBussiness } from "../../business/login/LoginBussiness";
import ServiceModel from "../../models/ServiceModel";
import { DatabaseConfig } from "../../config/Constant";
import jwt from "jsonwebtoken";
import _ from 'lodash';
import HttpCode from "../../config/HttpCode";
import Timeout from "../../config/Timeout";
const JWT_EXPIRATION_TIME = Timeout.JWT_EXPIRATION_TIME;

	/**
	 * Function handler login
	 *
	 * @param {*} event
	 * @param {*} context
	 * @param {*} callback
	 */
	const login = async (event, context, callback) => {
		let serviceModel = new ServiceModel(DatabaseConfig);
		let account = new LoginBussiness(serviceModel.getDb());

		// Get request parameter
		let req = JSON.parse(event.body);

		//received IP from client
		let requestip = event.headers.IP;

		try {
			return account.getUserByEmail(req,requestip)
				.then(data => {
					if (_.isEmpty(data)) {
						return serviceModel.createErrorCallback(HttpCode.NOT_FOUND, "Login Fail!!!");
					}

            let infoUser = {
						"client_id": data[0].client_id,
						"member_id": data[0].member_id,
						"member_pass": data[0].member_pass,
						"mail_address": data[0].mail_address,
          };
          console.log(infoUser)
					let token = jwt.sign(infoUser, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
					return serviceModel.createSuccessCallback(HttpCode.SUCCESS,{ token, JWT_EXPIRATION_TIME });
				})
				.catch(err => {
					console.log(err)
					return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
				});
		} catch (err) {
			return serviceModel.createErrorCallback(HttpCode.ERROR, "Internal Server Error!!!");
		}
	}

	/**
	 * Function get detech token get user infomation
	 *
	 * @param {*} event
	 * @param {*} context
	 * @param {*} callback
	 */
	const getInfUserByToken = async (event, context, callback) => {
		let serviceModel = new ServiceModel(DatabaseConfig);
		let account = new LoginBussiness(serviceModel.getDb());

		try {
			let token = event.headers.Authorization;
			let decodeToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decodeToken)
			return account.getUserByToken(decodeToken)
				.then(data => {
					if (_.isEmpty(data)) {
						return serviceModel.createSuccessCallback(HttpCode.SUCCESS, { code: "Not Authentication" });
					}

					let infoUser = { "client_id": data[0].client_id, "member_id": data[0].member_id, "mail_address": data[0].mail_address };

					return serviceModel.createSuccessCallback(HttpCode.SUCCESS, {infoUser});
				});
		} catch (err) {
			return serviceModel.createSuccessCallback(HttpCode.SUCCESS,  { code: "Not Authentication" });
		}
	}

export { login, getInfUserByToken }
