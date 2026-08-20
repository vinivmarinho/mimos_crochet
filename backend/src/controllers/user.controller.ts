import bcrypt from "bcrypt";
import { type Request, type Response} from "express";
import pool from "../config/database.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

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


async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = result.rows[0];
    // Não revela se email existe para evitar enumeração de usuários
    if (!user) {
        return res.status(401).json({
            message: "Email ou senha inválidos"
        })
    };
    

    const passwordIsValid = await bcrypt.compare(password, user.password_hash);

    if (!passwordIsValid) {
        return res.status(401).json({
            message: "Email ou senha inválidos"
        })
    };

    // Gera um JWT assinado (com a chave secreta) que identifica o usuário e expira em 1 hora
    const token = jwt.sign(
        {
            userId: user.user_id,
            email: user.email
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1h"
        }
    );

    // Retorna o token para ser utilizado nas próximas requisições autenticadas
    return res.status(200).json({
        token,
        user: {
            id: user.user_id,
            email: user.email
        }
    });
}
export { createUser, login };
