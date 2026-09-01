import { JwtPayload } from "jsonwebtoken";


/* 
* O Express não possui a propriedade "user" no objeto Request por padrão
* Porém, o middleware de autenticação adiciona os dados do usuário autenticado através de "req.user = decoded".
* 
* Essa declaração estende a interface Request do Express para informar ao TS que a propriedade "user" pode existir na requisição
* Assim, é possível acessar "req.user" em outros middlewares e controllers sem que o TS apresente um erro de propriedade inexistente
*/

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export {};
