import { Request, Response, NextFunction } from "express";

function isAdmin(req: Request, res: Response, next: NextFunction ) {
    if (req.user?.role !== "admin") {
        return res.status(403).json({
            message: "Acesso permitido apenas para administradores"
        });
    }
    next();
}

export default isAdmin;