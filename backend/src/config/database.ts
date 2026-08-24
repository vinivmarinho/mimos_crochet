import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool(
    process.env.RENDER_DATABASE_URL ? {
        connectionString: process.env.RENDER_DATABASE_URL,
    } : {
            host: process.env.RENDER_DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
    }
)

export default pool;

