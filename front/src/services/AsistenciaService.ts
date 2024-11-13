import axios from 'axios';
import { safeParse } from 'valibot';
import { AlumnosSchema } from '../types';

const ALUMNO_URL = `${import.meta.env.VITE_API_URL}/alumno`;
const ASISTENCIA_URL = `${import.meta.env.VITE_API_URL}/asistencia`;

// Función para obtener alumnos con validación de datos
export async function obtenerAlumnos() {
    try {
        const { data } = await axios.get(ALUMNO_URL);
        console.log("Datos de la API:", data); // Imprimir datos

        const result = safeParse(AlumnosSchema, data);

        if (result.success) {
            return result.output; // Devuelve los alumnos si la validación es exitosa
        } else {
            console.log("Errores de validación:", result.issues); // Imprimir problemas de validación
            throw new Error('Hubo un error en la validación de los datos');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener los alumnos');
    }
}

// Interfaz de los datos de asistencia
interface AsistenciaData {
    fecha: string;
    alumnos: {
        id_alumno: number;
        estado: 'Presente' | 'Ausente' | 'Justificativo';
    }[];
}

// Función para transformar los datos de entrada al formato de AsistenciaData
function transformarDatosAsistencia(datos: Record<string, any>): AsistenciaData {
    const { fecha, ...estados } = datos;

    const alumnos = Object.entries(estados).map(([key, estado]) => {
        const id = parseInt(key.replace('estado_', ''));

        // Validamos que el id es un número válido y estado no es nulo o indefinido
        if (!isNaN(id) && estado) {
            return { id_alumno: id, estado };
        } else {
            throw new Error(`Datos inválidos para alumno con clave ${key} y estado ${estado}`);
        }
    });

    return { fecha, alumnos };
}

// Servicio para registrar la asistencia
export async function registrarAsistencia(datos: Record<string, any>): Promise<void> {
    const data = transformarDatosAsistencia(datos);  // Transformar los datos al formato adecuado

    console.log("Datos enviados al backend:", data);  // Aquí ves el formato de `data`

    try {
        await axios.post(ASISTENCIA_URL, data);  // Llamada a la API con los datos transformados
        console.log('Asistencia registrada exitosamente');
    } catch (error) {
        console.error('Error al registrar la asistencia:', error);
        throw new Error('Error al registrar la asistencia');
    }
}
