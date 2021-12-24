import bodyParser from 'body-parser';
import express from 'express';
import asyncHandler from 'express-async-handler';

import {schemas} from '../schemas/employer.js';
import {bodyValidateMiddleware, verifyTokenMiddleware} from '../schemas/middleware.js';
import {Employer} from '../services/crud/employer.js';

const parser = bodyParser.json();
export const employeesRouter = express();

employeesRouter.get('/', parser, asyncHandler(async (request, response) => {
	const validationResult = schemas.filterSortGET.validate(request.query, {convert: true});
	const valid = validationResult.error == null;
	if (valid === false) {
		const {details} = validationResult.error;
		const message = details.map(i => i.message).join(',');

		console.log('error', message);
		response.status(400).json({data: request.query, errorDetails: message});
	} else {
		const {name, surname, sortedBy, order, page} = validationResult.value;
		const employeesDict = await Employer.getAllEmployeesFilterSort(name, surname, sortedBy, order, page);
		response.status(200).json(employeesDict);
	}
}));

employeesRouter.get('/:id', parser, asyncHandler(async (request, response) => {
	const id = request.params.id;
	const [employee] = await Employer.getEmployerById(Number.parseInt(id, 10));
	if (employee) {
		response.status(200).json(employee);
	} else {
		response.status(404).json({errorDetails: `Employer with id ${id} not found`});
	}
}));

employeesRouter.post('/', parser, bodyValidateMiddleware(schemas.employeePOST), verifyTokenMiddleware(),
	asyncHandler(async (request, response) => {
		const data = request.body;
		const employer = await Employer.createEmployer(data);
		response.status(201).json(employer);
	}));

employeesRouter.put('/:id', parser, bodyValidateMiddleware(schemas.employeePUT), verifyTokenMiddleware(),
	asyncHandler(async (request, response) => {
		const data = request.body;
		const id = request.params.id;
		const employer = await Employer.updateEmployer(Number.parseInt(id, 10), data);
		if (employer) {
			response.status(200).json(employer);
		} else {
			response.status(404).json({errorDetails: `Employer with id ${id} not found`});
		}
	}));

employeesRouter.delete('/:id', parser, verifyTokenMiddleware(),
	asyncHandler(async (request, response) => {
		const id = request.params.id;
		const employer = await Employer.deleteEmployer(Number.parseInt(id, 10));
		if (employer) {
			response.status(200).json(employer);
		} else {
			response.status(404).json({errorDetails: `Employer with id ${id} not found`});
		}
	}));
