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
            message: `Não foi possível cadastrar a peça: ${req.body.name}. Erro: ${error}`
        })
    }
};

async function getPieces(req: Request, res: Response) {
    try {
        const response = await pool.query(`SELECT * FROM pieces`);

        const data = response.rows;
        return res.status(200).json({
            data: data
        });
    } catch(error) {
        return res.status(400).json({
            message: "Não foi possível encontrar as peças"
        })
    }
}


async function deletePiece(req: Request, res: Response) {
    try {
        const { pieceId } = req.params;
        await pool.query("DELETE FROM pieces WHERE piece_id = $1", [pieceId])
        return res.status(200).json({
            message: "Peça deletada com sucesso!"
        })
    } catch(error) {
        return res.status(400).json({
            message: `Não foi possível deletar essa peça!, ${error}`
        })
    }
}
export { createPiece, getPieces, deletePiece };