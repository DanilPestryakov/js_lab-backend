import express from 'express';

export const handleNotExistRouter = express();

handleNotExistRouter.delete('/', (request, response, next) => {
	const error = new Error('rout does not exist');
	error.statusCode = 404;
	next(error);
});

handleNotExistRouter.get('/', (request, response, next) => {
	const error = new Error('rout does not exist');
	error.statusCode = 404;
	next(error);
});

handleNotExistRouter.post('/', (request, response, next) => {
	const error = new Error('rout does not exist');
	error.statusCode = 404;
	next(error);
});

handleNotExistRouter.put('/', (request, response, next) => {
	const error = new Error('rout does not exist');
	error.statusCode = 404;
	next(error);
});
