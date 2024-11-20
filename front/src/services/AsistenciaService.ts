import axios from 'axios';
import { safeParse } from 'valibot';
import { AlumnosSchema } from '../types';

const ALUMNO_URL = `${import.meta.env.VITE_API_URL}/alumno`;
const ASISTENCIA_URL = `${import.meta.env.VITE_API_URL}/asistencia`;
const CARRERA_URL = `${import.meta.env.VITE_API_URL}/carrera`;

console.log("ASISTENCIA_URL:", ASISTENCIA_URL);

// Función para obtener alumnos con validación de datos
export async function obtenerAlumnos() {
    try {
        const { data: alumnosData } = await axios.get(ALUMNO_URL);
        const { data: carrerasData } = await axios.get(CARRERA_URL);
        console.log("Datos de la API:", alumnosData, carrerasData);

        const result = safeParse(AlumnosSchema, alumnosData);

        if (result.success) {
            const carrerasMap = new Map(carrerasData.map((carrera: { id_carrera: number, nom_carrera: string }) => [carrera.id_carrera, carrera.nom_carrera]));
            return result.output.map(alumno => ({
                ...alumno,
                nom_carrera: carrerasMap.get(alumno.id_carrera) || ''
            }));
        } else {
            console.log("Errores de validación:", result.issues);
            throw new Error('Error en la validacion de los datos');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener los alumnos');
    }
}

// Interfaz de los datos de asistencia
interface Alumno {
    id_alumno: number;
    estado: 'Presente' | 'Ausente';
}

interface AsistenciaData {
    fecha: string;
    alumnos: Alumno[];
}

// Función para transformar los datos de entrada al formato de AsistenciaData
function transformarDatosAsistencia(datos: Record<string, any>): AsistenciaData {
    const { fecha, alumnos } = datos;

    console.log("Datos recibidos para transformación:", datos);
    console.log("Fecha:", fecha);
    console.log("Alumnos:", alumnos);

    const alumnosTransformados = alumnos.map((alumno: any) => {
        console.log(`Transformando estado de alumno: id = ${alumno.id_alumno}, estado = ${alumno.estado}`);

        if (!isNaN(alumno.id_alumno) && typeof alumno.estado === 'string' && ['Presente', 'Ausente'].includes(alumno.estado)) {
            return { id_alumno: alumno.id_alumno, estado: alumno.estado };
        } else {
            console.warn(`Dato inválido para el alumno: id = ${alumno.id_alumno}, estado = ${alumno.estado}`);
            return null;
        }
    }).filter((alumno): alumno is Alumno => alumno !== null);

    console.log("Alumnos transformados:", alumnosTransformados);
    return { fecha, alumnos: alumnosTransformados };
}

// Servicio para registrar la asistencia
export async function registrarAsistencia(datos: Record<string, any>): Promise<void> {
    const data = transformarDatosAsistencia(datos);

    console.log("Datos enviados al backend:", data);

    try {
        await axios.post(ASISTENCIA_URL, data, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log('Asistencia registrada exitosamente');
    } catch (error) {
        console.error('Error al registrar la asistencia:', error);
    }
}