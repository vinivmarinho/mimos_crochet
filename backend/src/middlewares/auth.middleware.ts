import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.access_token; // Busca token que está guardado no navegador através de um cookie
    
    // Se token não existir, usuário não está autenticado
    if (!token) {
        return res.status(401).json({
            message: "Acesso não autorizado"
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string); // Verifica se o token é válido e, se for, retorna os dados armazenados no seu payload

        // Se os dados decodificados forem uma string, não estão no formato esperado
        if (typeof decoded === "string") {
            return res.status(401).json({
                message: "Token inválido"
            });
        };

        // Armazena os dados do usuário decodificados no objeto da requisição para que possam ser usados pelos próximos middlewares e controllers
        req.user = decoded;
        next();
    } catch(error) {
        return res.status(401).json({
            message: "Token inválido ou expirado"
        })
    }
}

export { authenticateToken };
    