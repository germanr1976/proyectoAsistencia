import express from 'express';
import {
    getAsistencias,
    getAsistenciaById,
    registrarAsistencia,
    obtenerAlumnos,
    updateAsistencia,
    deleteAsistencia
} from '../controllers/asistController';

const router = express.Router();

// Ruta para crear una nueva asistencia
router.post('/', registrarAsistencia);

// Ruta para obtener todas las asistencias
router.get('/', getAsistencias);

// Ruta para obtener alumnos por carrera y año
router.get('/', obtenerAlumnos);

// Ruta para obtener una asistencia por su ID
router.get('/:id', getAsistenciaById);

// Ruta para actualizar una asistencia
router.put('/:id', updateAsistencia);

// Ruta para eliminar una asistencia
router.delete('/:id', deleteAsistencia);

export default router;
