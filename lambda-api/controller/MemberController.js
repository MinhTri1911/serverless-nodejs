import { MemberModel } from "../models/Member";
import { MemberBusiness } from "../business/MemberBusiness";
import ServiceModel from "../models/ServiceModel";
import ServiceModelConfig from "../config/Constant";
import crypto from 'crypto';

const secretKey = process.env.SECRET_KEY;

const getMember = (event, context, callback) => {
	let serviceModel = new ServiceModel(ServiceModelConfig);
	let memberBusiness = new MemberBusiness(serviceModel.getDb());

	return memberBusiness
		.getMember()
		.then(results => {
			return serviceModel.createSuccessCallback(results.code, "oke");
		})
		.catch(e => {
			if (Object.prototype.hasOwnProperty.call(e, "code") && Object.prototype.hasOwnProperty.call(e, "message")) {
					return serviceModel.createErrorCallback(e.code, e.message);
			} else {
					return serviceModel.createErrorCallback(e.code, e.message);
					// return serviceModel.createErrorCallback(500,	"Internal Server Error 3!!");
			}
		});
};

const hashDemo = async (event) => {

	const hash = crypto.createHash('sha256').update(secretKey + 'password').digest('hex');
	console.log(hash);

	return hash;
}

export { getMember, hashDemo };
