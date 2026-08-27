import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.RENDER_DATABASE_URL,
  ssl: process.env.RENDER_DATABASE_URL 
      ? { rejectUnauthorized: false }
      : false
    // Usa ssl quando a URL do banco (na render) está definida
});

export default pool;

