import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import router from './router/user';

const app = express();
dotenv.config();
app.use(bodyParser.json())
app.use(express.json())
app.use("/api", router)
app.listen(process.env.PORT,()=>{
    console.log("Server đang chạy với port 3030");
})
