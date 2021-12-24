import {db} from '../../db/db-connector.js';

export class EmployerConnection {
	static #tableName = 'employer';

	static createTable() {
		db.schema.createTableIfNotExists(EmployerConnection.#tableName, t => {
			t.increments('id').primary();
			t.string('name');
			t.string('surname');
			t.date('birthday');
			t.string('post');
			t.integer('salary');
		}).then(row => console.log(row)).catch(error => console.log(error));
	}

	static dropTable() {
		db.schema.dropTable(EmployerConnection.#tableName).then(() => console.log('table dropped'))
			.catch(error => {
				console.log(error);
				throw error;
			})
			.finally(() => {
				db.destroy().then();
			});
	}
}
