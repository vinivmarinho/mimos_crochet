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
            message: `Não foi possível cadastrar usuário. Erro: ${error}`
        })
    }
};


async function login(req: Request, res: Response) {
    try {
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
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: "1h"
            }
        );
        // Envia o token em um cookie chamado "access_token". Navegador irá armazená-lo
        res.cookie("access_token", token, {
            httpOnly: true, // Impede que o cookie seja acessado por JavaScript
            secure: true, // O cookie só é enviado através de Https
            sameSite: "lax" // Ajuda a proteger contra ataques CSRF
        });

        // Retorna dados do usuário para serem utilizados pelo frontend
        return res.status(200).json({
            user: {
                id: user.user_id,
                email: user.email
            }
        });
    } catch(error) {
        return res.status(500).json({
            message: `Não foi possível realizar o login, erro: ${error}`
        })
    }
}
export { createUser, login };
