import express from 'express';
import {
    getAlumnos,
    getAlumno,
    createAlumno,
    updateAlumno,
    deleteAlumno,
    getAlumnosPorCarreraYAnio
} from '../controllers/alumnController';

const router = express.Router();

// Ruta para crear un nuevo alumno
router.post('/', createAlumno);

// Otras rutas
router.get('/', getAlumnos);
router.get('/:id', getAlumno);
router.put('/:id', updateAlumno);
router.delete('/:id', deleteAlumno);

// Ruta para obtener alumnos por carrera y año
router.get('/carrera/:idCarrera/anio/:anio', getAlumnosPorCarreraYAnio);


export default router;