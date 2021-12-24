import {db} from '../../db/db-connector.js';

export class Employer {
	static #tableName = 'employer';

	static async getEmployerById(id) {
		return db(Employer.#tableName).select('*').where({id: id}).returning('*').catch(error => {
			throw error;
		});
	}

	static async createEmployer(data) {
		const [employer] = await db(Employer.#tableName).insert(data).returning('*').catch(error => {
			throw error;
		});
		return employer;
	}

	static async updateEmployer(id, data) {
		let [employer] = await Employer.getEmployerById(id);
		if (!employer) {
			return null;
		}

		[employer] = await db(Employer.#tableName).where({id: id}).update(data).returning('*').catch(error => {
			throw error;
		});
		return employer;
	}

	static async deleteEmployer(id) {
		let [employer] = await Employer.getEmployerById(id);
		if (!employer) {
			return null;
		}

		[employer] = await db(Employer.#tableName).del().where({id: id}).returning('*').catch(error => {
			throw error;
		});
		return employer;
	}

	static async getAllEmployeesFilterSort(name = null, surname = null, sortedBy = 'salary',
	                                        sortOrder = 'ASC', pageNumber = null) {
		const query = db(Employer.#tableName).select('*');
		if (name) {
			query.whereRaw(`LOWER(name) LIKE '%${name.toLowerCase()}%'`);
		}

		if (surname) {
			query.whereRaw(`LOWER(surname) LIKE '%${surname.toLowerCase()}%'`);
		}

		query.orderBy(sortedBy, sortOrder);
		if (pageNumber) {
			query.limit(25);
			query.offset(25 * (pageNumber - 1));
		}

		query.catch(error => {
			throw error;
		});
		return query;
	}
}
