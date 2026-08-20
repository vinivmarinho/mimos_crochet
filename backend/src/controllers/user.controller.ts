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

async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    // Preciso verificar se email existe no meu banco
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    const user = result.rows[0];
    if (!user) {
        return res.status(401).json({
            message: "Email ou senha inválidos"
        })
    };
    // Preciso comparar o hash da senha com a senha enviada
    const passwordIsValid = await bcrypt.compare(password, user.password_hash);

    if (!passwordIsValid) {
        return res.status(401).json({
            message: "Email ou senha inválidos"
        })
    };

    res.status(200).json({
        message: user
    });

}
export { createUser, login };
