import { Request, Response } from 'express';
import Asistencia from '../models/Asistencia.models';
import Alumno from '../models/Alumn.models';

// Función para obtener alumnos
export const obtenerAlumnos = async (req: Request, res: Response) => {
    try {
        const alumno = await Alumno.findAll();
        res.status(200).json(alumno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Función para registrar asistencia
export const registrarAsistencia = async (req: Request, res: Response) => {
    try {
        const { fecha, alumnos } = req.body;

        if (!fecha || !alumnos || !Array.isArray(alumnos)) {
            return res.status(400).json({ error: 'Datos de asistencia inválidos' });
        }

        const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
        if (!regexFecha.test(fecha)) {
            return res.status(400).json({ error: 'Formato de fecha inválido, debe ser YYYY-MM-DD' });
        }

        const estadosValidos: Set<string> = new Set(['Presente', 'Ausente', 'Justificativo']);
        const asistencias = alumnos.map((alumno: { id_alumno: number; estado: string }) => {
            if (!estadosValidos.has(alumno.estado)) {
                throw new Error(`Estado inválido para el alumno con ID ${alumno.id_alumno}: ${alumno.estado}`);
            }

            const fechaFormatoCorrecto = new Date(fecha).toISOString().split('T')[0];

            return {
                id_alumno: alumno.id_alumno,
                fecha: fechaFormatoCorrecto,
                estado: alumno.estado,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });

        console.log("Datos recibidos para registrar asistencia:", asistencias);

        await Asistencia.bulkCreate(asistencias);

        res.status(201).json({ message: 'Asistencia registrada exitosamente' });
    } catch (error) {
        console.error('Error al registrar la asistencia:', error);
        res.status(500).json({ error: 'Error al registrar la asistencia' });
    }
};

// Obtener todas las asistencias
export const getAsistencias = async (req: Request, res: Response) => {
    try {
        const asistencias = await Asistencia.findAll();
        res.status(200).json(asistencias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener asistencia específica por ID
export const getAsistenciaById = async (req: Request, res: Response) => {
    const { id_asistencia } = req.params;

    try {
        const asistencia = await Asistencia.findByPk(id_asistencia, {
            include: [Alumno]
        });

        if (!asistencia) {
            return res.status(404).json({ error: 'Asistencia no encontrada' });
        }
        res.status(200).json(asistencia);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la asistencia' });
    }
};

// Actualizar una asistencia existente
export const updateAsistencia = async (req: Request, res: Response) => {
    const { id_asistencia } = req.params;

    try {
        const asistencia = await Asistencia.findByPk(id_asistencia);

        if (!asistencia) {
            return res.status(404).json({ error: 'Asistencia no encontrada' });
        }

        const { id_alumno, fecha, estado } = req.body;
        await asistencia.update({ id_alumno, fecha, estado });

        res.status(200).json({ message: 'Asistencia actualizada correctamente', asistencia });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la asistencia' });
    }
};

// Eliminar una asistencia
export const deleteAsistencia = async (req: Request, res: Response) => {
    const { id_asistencia } = req.params;

    try {
        const asistencia = await Asistencia.findByPk(id_asistencia);

        if (!asistencia) {
            return res.status(404).json({ error: 'Asistencia no encontrada' });
        }

        await asistencia.destroy();
        res.status(200).json({ message: 'Asistencia eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la asistencia' });
    }
};
