import express from "express";
import { signIn, signup,getAllUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin",signIn)
router.get("/",getAllUser)
export default router