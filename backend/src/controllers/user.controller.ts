// Preciso passar a senha em formato hash
import bcrypt from "bcrypt";
import { type Request, type Response} from "express";
import pool from "../config/database.js";

async function createUser(req: Request, res: Response) {
    try {
        const {name, email, password } = req.body;
        const password_hash = await bcrypt.hash(password, 10);

        await pool.query(`INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)`, [name, email, password_hash]);

        res.status(200).json({
            message: `Usuário ${name} cadastrado com sucesso`
        })
    } catch(error) {
        res.status(500).json({
            message: `Não foi possível cadastrar usuário`
        })
    }
};

export { createUser };
