import express from 'express';
import {
    createCarrera,
    getCarreras,
    getCarrera,
    updateCarrera,
    eliminarCarrera
} from '../controllers/carreraController';

const router = express.Router();

// Ruta para crear una nueva carrera
router.post('/', createCarrera);

// Ruta para obtener todas las carreras
router.get('/', getCarreras);

// Ruta para obtener una carrera por su ID
router.get('/:id', getCarrera);

// Ruta para actualizar una carrera
router.put('/:id', updateCarrera);

// Ruta para eliminar una carrera
router.delete('/:id', eliminarCarrera);

export default router;
