import { NextFunction, type Request, type Response } from "express";
import validator from "validator";
import pool from "../config/database.js";

async function validateUser(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, confirmPassword } = req.body;

    // Verifica se algum campo não foi enviado (undefined) ou possui valor null
    if (name == null || email == null || password == null || confirmPassword == null) {
        return res.status(400).json({
            message: "Todos os campos devem ser preenchidos"
        })
    }

    // Verifica se campos são strings
    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string" || typeof confirmPassword !== "string") {
        return res.status(400).json({
            message: "Todos os campos devem ser do tipo string"
        })
    }

     // Verifica se algum campo é uma string vazia ou contém apenas espaços
    if (name.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
        return res.status(400).json({
            message: "Os campos não podem estar vazios"
        })
    }


    // Verifica se email é válido
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            message: "Formato de email inválido"
        })
    };
    // Verifica se email já foi cadastrado
    const emailExists = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (emailExists.rows.length > 0) {
            return res.status(409).json({
                message: `Já existe uma conta cadastrada com esse email`
            })
        }
        
    // Verifica se senha é válida
    if (password.length < 8) {
        return res.status(400).json({
            message: "A senha deve possuir no mínimo 8 caracteres"
        })
    };

    if (password.length > 72) {
        return res.status(400).json({
            message: "A senha deve possuir no máximo 72 caracteres"
        })
    };
        
    if (password !== confirmPassword) {
        return res.status(400).json({
            message: "As senhas não coincidem "
        })
    }


    next()
};

export { validateUser };
 