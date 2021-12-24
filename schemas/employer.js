import Joi from 'joi';

export const schemas = {
	employeePOST: Joi.object().keys({
		name: Joi.string().min(1).max(100).required(),
		surname: Joi.string().min(1).max(100).required(),
		post: Joi.string().valid('Junior Software Engineer', 'Software Engineer',
			'Senior Software Engineer', 'Lead Software Engineer'),
		birthday: Joi.date().required(),
		salary: Joi.number().min(0).integer().required(),
	}),
	employeePUT: Joi.object().keys({
		name: Joi.string().min(1).max(100),
		surname: Joi.string().min(1).max(100),
		post: Joi.string().valid('Junior Software Engineer', 'Software Engineer',
			'Senior Software Engineer', 'Lead Software Engineer'),
		birthday: Joi.date(),
		salary: Joi.number().min(0).integer(),
	}),
	filterSortGET: Joi.object().keys({
		name: Joi.string().min(1).max(100),
		surname: Joi.string().min(1).max(100),
		sortedBy: Joi.string().valid('id', 'name', 'surname', 'post', 'birthday', 'salary').insensitive(),
		order: Joi.string().valid('asc', 'desc').insensitive(),
		page: Joi.number().min(1).integer(),
	})
};
