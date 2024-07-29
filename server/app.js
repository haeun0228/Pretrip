import express from 'express';
import router from "./Router/kakaoRoutes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
//import connectDB from './config/db.js'; 

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/auth', router);

app.listen(port, () => console.log(`Server started`));
