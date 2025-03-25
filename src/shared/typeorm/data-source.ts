import { DataSource } from 'typeorm';
import 'dotenv/config';

const port = Number(process.env.DB_PORT);

export const AppDataSource = new DataSource({
type: 'postgres',
host: process.env.DB_HOST,
port: port,
username: process.env.DB_USERNAME,
password: process.env.DB_PASSWORD,
database: process.env.DB_DATABASE,
});
