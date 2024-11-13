import { Request, Response } from "express";
import Preceptor from "../models/Precept.models";

export async function LoginPreceptores(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const preceptor = await Preceptor.findOne({ where: { username, password } });

        if (!username || !password) {
            return res.status(400).json({ message: "Todos los campos son requeridos" })

        }

        if (!preceptor) {
            return res.status(404).json({ message: "verifique los datos ingresados" })
        }

        return res.json({
            data: {
                username: preceptor.username,
            },
            message: "Login exitoso",
            authenticated: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al realizar el login",
            error: error.message
        })

    }
}