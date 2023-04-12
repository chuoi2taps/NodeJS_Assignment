import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import router from "./router/index";
import mongoose from "mongoose";
import cors from 'cors'
//Config
const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(cors())
dotenv.config();

app.use("/api",router)


mongoose.connect("mongodb://127.0.0.1:27017/we17306");

export const viteNodeApp = app;

// app.listen(process.env.PORT, () => {
//     console.log("Server is running on port 8080");
// });

























// //Router
// app.get("/api/products", async (req, res) => {
//     const { data: products } = await axios.get("http://localhost:3001/products");
//     res.status(200).json(products);
// });

// app.get("/api/products/:id", async (req, res) => {
//     const { data: product } = await axios.get(`http://localhost:3001/products/${req.params.id}`);
//     res.status(200).json({
//         message: "Product found",
//         data: product,
//     });
// });
// // client -> server nodes
// app.post("/api/products", async (req, res) => {
//     // gửi request từ server nodes -> json-server
//     const { data: product } = await axios.post("http://localhost:3001/products", req.body);
//     res.status(201).json({
//         message: "Product created",
//         data: product,
//     });
// });

// app.delete("/api/products/:id", async (req, res) => {
//     await axios.delete(`http://localhost:3001/products/${req.params.id}`);
//     res.status(200).json({
//         message: "Sản phẩm đã được xóa thành công",
//     });
// });
// app.patch("/api/products/:id", async (req, res) => {
//     const { data: product } = await axios.patch(
//         `http://localhost:3001/products/${req.params.id}`,
//         req.body
//     );
//     res.status(200).json({
//         message: "Sản phẩm đã được cập nhật thành công",
//         data: product,
//     });
// });
