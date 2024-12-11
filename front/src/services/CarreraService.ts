import axios from 'axios';
import { safeParse } from 'valibot';
import { DrafCarreraSchema } from "../types";

type CarreraData = {
    [k: string]: FormDataEntryValue
}

const CARRERA_URL = `${import.meta.env.VITE_API_URL}/carrera`;

export async function carrera(data: CarreraData): Promise<void> {
    try {
        const fechaActual = new Date();

        // Validamos los datos recibidos usando Valibot
        const result = safeParse(DrafCarreraSchema, {
            nom_carrera: data.nom_carrera,
            createdAt: fechaActual,
            updatedAt: fechaActual
        });

        if (!result.success) {
            console.log(result.issues);
            throw new Error('Formato incorrecto de los datos');
        }

        // Llamada a la API solo si la validación fue exitosa
        const response = await axios.post(CARRERA_URL, {
            nom_carrera: result.output.nom_carrera,
            createdAt: fechaActual,
            updatedAt: fechaActual
        });

        console.log('Registro exitoso:', response.data);

    } catch (error: unknown) {
        console.error('Error al registrar los datos:', error);

        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Error de registro');
        }
        throw new Error('Error en el registro');
    }
}

export async function obtenerCarreras() {
    try {
        const { data } = await axios.get(CARRERA_URL);
        return data;
    } catch (error) {
        console.error('Error al obtener las carreras:', error);
        throw new Error('Error al obtener las carreras');
    }
}

export async function eliminarCarrera(id: number): Promise<void> {
    try {
        await axios.delete(`${CARRERA_URL}/${id}`);
        console.log('Carrera eliminada exitosamente');
    } catch (error) {
        console.error('Error al eliminar la carrera:', error);
        throw new Error('Error al eliminar la carrera');
    }
}

// Nuevo servicio para editar una carrera
export async function editarCarrera(id: number, datos: { nom_carrera: string }): Promise<void> {
    try {
        const response = await axios.put(`${CARRERA_URL}/${id}`, datos, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Carrera actualizada exitosamente:', response.data);
    } catch (error) {
        console.error('Error al actualizar la carrera:', error);
        throw new Error('Error al actualizar la carrera');
    }
}