import { Request, Response } from "express";
import Carrera from "../models/Carrera.models";

//Creo un nueva carrera
export const createCarrera = async (req: Request, res: Response) => {
    try {
        const carrera = await Carrera.create(req.body);
        res.status(201).json(carrera);
    } catch (error) {
        console.error('Error al crear una carrera', error);
        res.status(500).json({ error: error.message });
    }
};

//Obtengo todas las carreras
export const getCarreras = async (req: Request, res: Response) => {
    try {
        const carrera = await Carrera.findAll();
        res.status(200).json(carrera);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Obtengo una carrera por su id
export const getCarrera = async (req: Request, res: Response) => {
    try {
        const carrera = await Carrera.findByPk(req.params.id);
        if (carrera) {
            res.status(200).json(carrera);
        } else {
            res.status(404).json({ error: "No se encontraron carreras" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Actualizo una carrera
export const updateCarrera = async (req: Request, res: Response) => {
    try {
        const carrera = await Carrera.findByPk(req.params.id);
        if (carrera) {
            await carrera.update(req.body);
            res.status(200).json(carrera);
        } else {
            res.status(404).json({ error: "No se encontraron carreras para modificar" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Elimino una carrera
export const deleteCarrera = async (req: Request, res: Response) => {
    try {
        const deleted = await Carrera.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "No se encontraron carreras para eliminar" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
