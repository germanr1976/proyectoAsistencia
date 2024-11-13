import { Request, Response } from "express";
import Precept from "../models/Precept.models";

//Creo un nuevo preceptor
export const createPrecept = async (req: Request, res: Response) => {
    try {
        const precept = await Precept.create(req.body);
        res.status(201).json(precept);
    } catch (error) {
        console.error('Error al crear un preceptor', error);
        res.status(500).json({ error: error.messaje });
    }
};

//Obtengo todos los preceptores
export const Preceptores = async (req: Request, res: Response) => {
    try {
        const precept = await Precept.findAll();
        res.status(200).json(precept);
    } catch (error) {
        res.status(500).json({ error: error.messaje });
    }
};

//Obtengo un preceptor por su id
export const getPrecept = async (req: Request, res: Response) => {
    try {
        const precept = await Precept.findByPk(req.params.id);
        if (precept) {
            res.status(200).json(precept);
        } else {
            res.status(404).json({ error: "No se encontraron preceptor" });
        }
    } catch (error) {
        res.status(500).json({ error: error.messaje });
    }
};

//Actualizo un preceptor
export const updatePrecept = async (req: Request, res: Response) => {
    try {
        const precept = await Precept.findByPk(req.params.id);
        if (precept) {
            await precept.update(req.body);
            res.status(200).json(precept);
        } else {
            res.status(404).json({ error: "No se encontraron preceptor para modificar" });
        }
    } catch (error) {
        res.status(500).json({ error: error.messaje });
    }
};

//Elimino un preceptor
export const deletePrecept = async (req: Request, res: Response) => {
    try {
        const deleted = await Precept.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "No se encontraron preceptor para eliminar" });
        }
    } catch (error) {
        res.status(500).json({ error: error.messaje });
    }
};
