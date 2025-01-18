import express from "express";
import { sendNewYearWishes } from "../controllers/email.js";

const router = express.Router();

router.post("/send-wishes", sendNewYearWishes);

export default router;
