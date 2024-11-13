import { Request, Response } from "express";
import Alumno from "../models/Alumn.models";
import Carrera from "../models/Carrera.models";

// Crear un nuevo alumno y asociarlo con una carrera
export const createAlumno = async (req: Request, res: Response) => {
    try {
        const { id_carrera, ...alumnoData } = req.body;

        // Verificar si la carrera existe
        const carrera = await Carrera.findByPk(id_carrera);
        if (!carrera) {
            return res.status(404).json({ error: 'Carrera no encontrada' });
        }

        // Crear el alumno
        const alumno = await Alumno.create({ ...alumnoData, id_carrera });

        res.status(201).json(alumno);
    } catch (error) {
        console.error('Error al crear un alumno', error);
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los alumnos
export const getAlumnos = async (req: Request, res: Response) => {
    try {
        const alumno = await Alumno.findAll();
        res.status(200).json(alumno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener alumnos por carrera y año
export const getAlumnosPorCarreraYAnio = async (req: Request, res: Response) => {
    try {
        const { idCarrera, anio } = req.params;
        const alumnos = await Alumno.findAll({
            where: {
                id_carrera: idCarrera,
                anio: anio
            },
            include: [{
                model: Carrera,
                attributes: ['nom_carrera']
            }]
        });
        if (alumnos.length === 0) {
            return res.status(404).json({ error: 'No se encontraron alumnos para la carrera y año especificados' });
        }
        res.status(200).json(alumnos);
    } catch (error) {
        console.error('Error al obtener los alumnos por carrera y año', error);
        res.status(500).json({ error: error.message });
    }
};

//Obtengo un alumno por su id
export const getAlumno = async (req: Request, res: Response) => {
    try {
        const alumno = await Alumno.findByPk(req.params.id_alumno);
        if (alumno) {
            res.status(200).json(alumno);
        } else {
            res.status(404).json({ error: "No se encontraron alumnos" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Actualizo un alumno
export const updateAlumno = async (req: Request, res: Response) => {
    try {
        const alumno = await Alumno.findByPk(req.params.id_alumno);
        if (alumno) {
            await alumno.update(req.body);
            res.status(200).json(alumno);
        } else {
            res.status(404).json({ error: "No se encontraron alumnos para modificar" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Elimino un alumno
export const deleteAlumno = async (req: Request, res: Response) => {
    try {
        const deleted = await Alumno.destroy({
            where: { id_alumno: req.params.id_alumno }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "No se encontraron alumnos para eliminar" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
