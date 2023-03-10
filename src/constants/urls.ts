import dotenv from 'dotenv';

dotenv.config();

const env = process.env.PESAPAL_ENV as string;
const port = process.env.PORT;

export const urls = {
    clientUrl: env === "sandbox" ? "http://localhost:3000" : "https://ategoschool.com",
    pesapalBaseUrl: env === "sandbox" ? "https://cybqa.pesapal.com/pesapalv3" : "https://pay.pesapal.com/v3",
    baseUrl: `http://localhost:${port}`
}