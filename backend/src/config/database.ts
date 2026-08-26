import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.RENDER_DATABASE_URL,
  ssl:
    process.env.RENDER_DATABASE_URL && process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false
    // Usa ssl quando a aplicação está em produção e a URL do banco está definida
});

export default pool;

