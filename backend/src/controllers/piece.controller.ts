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

async function updatePiece(req: Request, res: Response) {
   
    try {
        const { pieceId } = req.params;
        // Recupera os dados atuais da peça para utilizá-los como referência na atualização parcial (PATCH)
        const pieceToUpdate = (await pool.query("SELECT * FROM pieces WHERE piece_id = $1", [ pieceId])).rows[0]
        if (!pieceToUpdate) {
            return res.status(404).json({
                message: "Peça não encontrada"
            })
        }
        // Combina os novos valores enviados na requisição com os valores atuais da peça
        // O operador "??" preserva o valor original caso uma propriedade não seja enviada
        // Atualização parcial de dados - PATCH
        const updatedPiece = {
            name: req.body.name ?? pieceToUpdate.name,
            price: req.body.price ?? pieceToUpdate.price,
            weight: req.body.weight ?? pieceToUpdate.weight,
            width: req.body.width ?? pieceToUpdate.width,
            height: req.body.height ?? pieceToUpdate.height,
            color: req.body.color ?? pieceToUpdate.color,
            availability_status: req.body.availability_status ?? pieceToUpdate.availability_status,
            image_url: req.body.image_url ?? pieceToUpdate.image_url
        }
        await pool.query(`
            Update pieces SET 
                name = $1, 
                price = $2, 
                weight = $3,
                width = $4,
                height = $5,
                color = $6,
                availability_status = $7,
                image_url = $8
            WHERE piece_id = $9`, [ 
            updatedPiece.name,
            updatedPiece.price,
            updatedPiece.weight,
            updatedPiece.width,
            updatedPiece.height,
            updatedPiece.color,
            updatedPiece.availability_status,
            updatedPiece.image_url,
            pieceId
        ])
        return res.status(200).json({
        message: "Peça atualizada com sucesso",
        piece: updatedPiece
    });
    } catch(error) {
        return res.status(400).json({
            message: "Não foi possível encontrar a peça"
        })
    }
}


export { createPiece, getPieces, deletePiece, updatePiece};