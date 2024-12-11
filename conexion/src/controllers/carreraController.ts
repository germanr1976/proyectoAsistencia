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
    const { id } = req.params;
    const { nom_carrera } = req.body; // Asegúrate de recibir los datos necesarios

    try {
        const carrera = await Carrera.findByPk(id);
        if (!carrera) {
            return res.status(404).json({ error: 'Carrera no encontrada' });
        }

        carrera.nom_carrera = nom_carrera || carrera.nom_carrera; // Actualiza solo el campo modificado
        await carrera.save();

        res.status(200).json({ message: 'Carrera actualizada exitosamente', carrera });
    } catch (error) {
        console.error('Error al actualizar carrera:', error);
        res.status(500).json({ error: 'Error al actualizar carrera' });
    }
};


//Elimino una carrera
export const eliminarCarrera = async (req: Request, res: Response) => {
const {id} = req.params;

    try {
        const carrera = await Carrera.findByPk(id);
        if (!carrera) {
            return res.status(404).json({ error: 'Carrera no encontrada' });
        }

        await carrera.destroy();
        res.status(200).json({ message: 'Carrera eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar carrera:', error);
        res.status(500).json({ error: 'Error al eliminar carrera' });
    }
};