import Joi from 'joi';

export const schemas = {
	userPOST: Joi.object().keys({
		login: Joi.string().min(6).max(100).required(),
		password: Joi.string().min(8).max(100).required(),
	})
};
