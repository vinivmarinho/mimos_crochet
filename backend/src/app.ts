import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import imageRoutes from "./routes/image.routes.js";
import pieceRoutes from "./routes/piece.route.js";

import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());

import { type Request, type Response} from "express";

const allowedOrigins = [
    process.env.LOCAL_FRONTEND_URL,
    process.env.PRODUCTION_FRONTEND_URL
];

// Permite que determinadas origens façam requisições para a API. 
// "credentials: true", permite que essas requisições usem crendenciais como cookies. (Permitindo que o token de acesso seja enviado à API)
app.use(cors({
    // "callback" usado para informar ao cors se a origem da requisição é permitida
    origin: (origin, callback) => {

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Origem não permitida pelo cors"))
        }
    },

    credentials: true
}));    



app.get("/teste", (req: Request, res: Response) => {
    res.status(200).json({
        message: `Rota teste funcionando`
    })
});

app.use("/users", userRoutes);
app.use("/images", imageRoutes);
app.use("/pieces", pieceRoutes);
export default app;
