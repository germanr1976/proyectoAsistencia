import express from "express"
import { inputErrors } from "../middleware"
import { LoginPreceptores } from "../controllers/authController"

const router = express.Router()

router.post("/", LoginPreceptores, inputErrors)

export default router
