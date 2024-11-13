import express from 'express';
import { 
    createPrecept,
    Preceptores,
    getPrecept,
    updatePrecept,
    deletePrecept
} from '../controllers/preceptController';

const router = express.Router();

// Ruta para crear un nuevo preceptor
router.post('/', createPrecept);

// Ruta para obtener todos los preceptores
router.get('/', Preceptores);

// Ruta para obtener un preceptor por su ID
router.get('/:id', getPrecept);

// Ruta para actualizar un preceptor
router.put('/:id', updatePrecept);

// Ruta para eliminar un preceptor
router.delete('/:id', deletePrecept);

export default router;