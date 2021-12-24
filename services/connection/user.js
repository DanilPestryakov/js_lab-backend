import {db} from '../../db/db-connector.js';

export class UserConnection {
	static #tableName = 'users';

	static createTable() {
		db.schema.createTableIfNotExists(UserConnection.#tableName, t => {
			t.increments('id').primary();
			t.string('login').unique().notNullable();
			t.string('password').notNullable();
		}).then(row => console.log(row)).catch(error => console.log(error));
	}

	static dropTable() {
		db.schema.dropTable(UserConnection.#tableName).then(() => console.log('table dropped'))
			.catch(error => {
				console.log(error);
				throw error;
			})
			.finally(() => {
				db.destroy().then();
			});
	}
}
