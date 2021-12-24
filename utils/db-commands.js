import cli from 'cli-command';
import {EmployerConnection} from '../services/connection/employer.js';
import {UserConnection} from '../services/connection/user.js';

cli().command('create_employer').action(EmployerConnection.createTable());
cli().command('drop_employer').action(EmployerConnection.dropTable());

cli().command('create_user').action(UserConnection.createTable());
cli().command('drop_user').action(UserConnection.dropTable());
