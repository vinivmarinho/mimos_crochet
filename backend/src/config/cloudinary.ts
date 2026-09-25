// v2 é uma versão da API do cloudinary
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export default cloudinary;