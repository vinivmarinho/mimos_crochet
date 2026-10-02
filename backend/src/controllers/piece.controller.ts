import { type Request, type Response } from "express";
import pool from "../config/database.js";

async function createPiece(req: Request, res: Response) {
    try {
        const {name, price, weight, width, height, color, availability_status, image_url } = req.body;
        
        await pool.query(`INSERT INTO pieces (name, price, weight, width, height, color, availability_status, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [name, price, weight, width, height, color, availability_status, image_url]);

        return res.status(200).json({
            message: `Peça ${name} cadastrada com sucesso!`,
        })
    } catch(error) {
        return res.status(400).json({
            message: `Não foi possível cadastrar a peça: ${req.body.name}. Erro: ${error}. Caiu no erro do controller`
        })
    }
};

async function getPieces(req: Request, res: Response) {
    try {
        const response = await pool.query(`SELECT * FROM pieces`);

        const data = response.rows[0];
        return res.status(200).json({
            data: data
        });
    } catch(error) {
        return res.status(400).json({
            message: "Não foi possível encontrar as peças"
        })
    }
}

export { createPiece, getPieces };