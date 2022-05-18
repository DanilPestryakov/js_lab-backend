import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import methodOverride from 'method-override';

import {employeesRouter} from './routers/employer.js';
import {handleNotExistRouter} from './routers/handle-not-exist-router.js';
import {usersRouter} from './routers/user.js';

const app = express();
const port = 3000;
const corsOptions ={
	origin:'*',
	credentials:true,            //access-control-allow-credentials:true
	optionSuccessStatus:200,
}


app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json({
	type: ['application/json', 'text/plain']
}))
app.use('/employees', employeesRouter);
app.use('/users', usersRouter);
app.get('/', (request, response) => {
	response.send('Hello World');
});
app.use('*', handleNotExistRouter);

app.use(methodOverride());
app.use((error, request, response, next) => {
	console.error(error.stack);
	response.status(error.statusCode || 500).json({errorDetails: error.message});
});

function startApp() {
	try {
		dotenv.config();
		app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
	} catch (error) {
		console.log(error);
	}
}

startApp();
