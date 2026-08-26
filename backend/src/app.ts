import "dotenv/config";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js"
const app = express();
app.use(express.json());

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


import { type Request, type Response} from "express";

app.get("/teste", (req: Request, res: Response) => {
    res.status(200).json({
        message: `Rota teste funcionando`
    })
});

app.use("/users", userRoutes)

export default app;
