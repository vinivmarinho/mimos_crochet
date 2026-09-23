import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
    connectionString: process.env.NEON_DATABASE_URL,
});

export default pool;
