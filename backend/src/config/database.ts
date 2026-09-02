import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
    connectionString: process.env.RENDER_DATABASE_URL,
    // Usa SSL quando a aplicação está conectada ao banco do Render
    ssl: process.env.RENDER_DATABASE_URL
        ? { rejectUnauthorized: false}
        : false
});

export default pool;
