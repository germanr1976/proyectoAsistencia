import { Request, Response } from 'express';
import Asistencia from '../models/Asistencia.models';
import Alumno from '../models/Alumn.models';



export const obtenerAlumnos = async (req: Request, res: Response) => {
    try {
        const alumno = await Alumno.findAll();
        res.status(200).json(alumno);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Función para registrar asistencia
// Función para registrar asistencia
export const registrarAsistencia = async (req: Request, res: Response) => {
    try {
        const { fecha, alumnos } = req.body;

        if (!fecha || !alumnos || !Array.isArray(alumnos)) {
            return res.status(400).json({ error: 'Datos de asistencia inválidos' });
        }

        const asistencias = alumnos.map((alumno: { id_alumno: number; estado: string }) => ({
            id_alumno: alumno.id_alumno,
            fecha,
            estado: alumno.estado,
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        await Asistencia.bulkCreate(asistencias);

        res.status(201).json({ message: 'Asistencia registrada exitosamente' });
    } catch (error) {
        console.error('Error al registrar la asistencia:', error);
        res.status(500).json({ error: 'Error al registrar la asistencia' });
    }
};

// 1. Obtener todas las asistencias
export const getAsistencias = async (req: Request, res: Response) => {
    try {
        const asistencias = await Asistencia.findAll({
            include: [Alumno] // Incluir detalles de Alumno
        });
        res.status(200).json(asistencias);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las asistencias' });
    }
};

// 2. Obtener asistencia específica por ID
export const getAsistenciaById = async (req: Request, res: Response) => {
    const { id_asistencia } = req.params;

    try {
        const asistencia = await Asistencia.findByPk(id_asistencia, {
            include: [Alumno] // Incluir detalles de Alumno
        });

        if (!asistencia) {
            return res.status(404).json({ error: 'Asistencia no encontrada' });
        }
        res.status(200).json(asistencia);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la asistencia' });
    }
};


// 4. Actualizar una asistencia existente
export const updateAsistencia = async (req: Request, res: Response) => {
    const { id_asistencia } = req.params;

    try {
        const asistencia = await Asistencia.findByPk(id_asistencia);

        if (!asistencia) {
            return res.status(404).json({ error: 'Asistencia no encontrada' });
        }

        // Actualizar los campos necesarios
        const { id_alumno, id_materia, id_preceptor, fecha, estado } = req.body;
        await asistencia.update({ id_alumno, id_materia, id_preceptor, fecha, estado });

        res.status(200).json({ message: 'Asistencia actualizada correctamente', asistencia });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la asistencia' });
    }
};

// 5. Eliminar una asistencia
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
