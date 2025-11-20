import { PrismaClient } from '../generated/prisma_client/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const connectionString = process.env.DATABASE_URL!;

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prismaClient = new PrismaClient({ adapter });

export const db = prismaClient;