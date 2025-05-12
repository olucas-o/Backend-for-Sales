import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: ['./src/modules/**/infra/database/entities/*.{ts,js}'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.{ts,js}'],
});
