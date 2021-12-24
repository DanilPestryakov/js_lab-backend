import bodyParser from 'body-parser';
import express from 'express';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import passwordHash from 'password-hash';

import {bodyValidateMiddleware} from '../schemas/middleware.js';
import {schemas} from '../schemas/user.js';
import {User} from '../services/crud/user.js';

const parser = bodyParser.json();
export const usersRouter = express();

usersRouter.post('/register', parser, bodyValidateMiddleware(schemas.userPOST),
	asyncHandler(async (request, response) => {
		const data = request.body;
		const user = await User.createUser(data);
		if (!user) {
			response.status(400).json({errorDetails: `User with login ${data.login} already exists`});
		}

		response.status(201).json(user);
	}));

usersRouter.get('/login', parser, bodyValidateMiddleware(schemas.userPOST),
	asyncHandler(async (request, response) => {
		const login = request.body.login;
		const user = await User.getUserByLogin(login);
		if (user == null) {
			response.status(401).json({errorDetails: `User with login ${login} not exists`});
		} else {
			if (passwordHash.verify(request.body.password, user.password) === false) {
				response.status(401).json({errorDetails: `Wrong password for user with login ${login}`});
			} else {
				jwt.sign({id: user.id, login: user.login}, process.env.SECRET, {expiresIn: 5 * 60},
					(error, token) => {
						response.status(200).json({token});
					});
			}
		}
	}));
