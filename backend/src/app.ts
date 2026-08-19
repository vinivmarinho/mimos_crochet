import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js"
const app = express();
app.use(express.json());
app.use(cors());    
import { type Request, type Response} from "express";

app.get("/teste", (req: Request, res: Response) => {
    res.status(200).json({
        message: `Rota teste funcionando`
    })
});

app.use("/users", userRoutes)

export default app;
