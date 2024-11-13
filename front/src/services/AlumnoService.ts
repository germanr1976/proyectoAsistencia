import { safeParse } from "valibot";
import axios from 'axios';
import { DrafAlumnoSchema } from "../types";

type AlumnoData = {
    [k: string]: FormDataEntryValue
}

const ALUMNO_URL = `${import.meta.env.VITE_API_URL}/alumno`;

export async function alumno(data: AlumnoData): Promise<void> {
    try {
        const fechaActual = new Date();

        // Validar y convertir fec_nacimiento
        const fecNacimientoString = data.fec_nacimiento as string;

        if (!fecNacimientoString) {
            throw new Error('La fecha de nacimiento es requerida');
        }

        const fecNacimiento = new Date(fecNacimientoString);
        if (isNaN(fecNacimiento.getTime())) {
            throw new Error('Fecha de nacimiento no válida');
        }

        // Validar los datos con valibot
        const result = safeParse(DrafAlumnoSchema, {
            nom_alumno: data.nom_alumno,
            apell_alumno: data.apell_alumno,
            dni: data.dni,
            cuil: data.cuil,
            fec_nacimiento: fecNacimiento,
            email: data.email,
            celular: data.celular,
            anio: data.anio, // Mantener anio como cadena
            id_carrera: Number(data.id_carrera), // Convertir id_carrera a número
            createdAt: fechaActual,
            updatedAt: fechaActual
        });

        if (!result.success) {
            console.log(result.issues);
            throw new Error('Formato incorrecto de los datos');
        }

        // Llamada a la API para registrar al alumno
        await axios.post(ALUMNO_URL, {
            nom_alumno: result.output.nom_alumno,
            apell_alumno: result.output.apell_alumno,
            dni: result.output.dni,
            cuil: result.output.cuil,
            fec_nacimiento: result.output.fec_nacimiento.toISOString(),
            email: result.output.email,
            celular: result.output.celular,
            anio: result.output.anio,
            id_carrera: result.output.id_carrera,
            createdAt: fechaActual,
            updatedAt: fechaActual
        });

        console.log('Registro exitoso del alumno y la carrera');

    } catch (error: unknown) {
        console.error('Error al registrar los datos:', error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Error de registro');
        }
        throw new Error('Error en el registro');
    }
}

export async function obtenerAlumnosPorCarrera(id_carrera: number, anio: string) {
    try {
        const response = await axios.get(ALUMNO_URL, { params: { id_carrera, anio } });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los alumnos:', error);
        throw error;
    }
}


export async function obtenerAlumno() {
    try {
        const { data } = await axios.get(ALUMNO_URL);
        console.log("Datos de la API:", data); // Imprimir datos

        const result = safeParse(DrafAlumnoSchema, data);

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

// export async function obtenerAlumno() {

//     try {
//         const url = ALUMNO_URL
//         const { data } = await axios(url)
//         //console.log(data.data)
//         const result = safeParse(AlumnosSchema, data.data) // Utilizo el AlumnosSchema por que lo convertimos a un array

//         if (result.success) {

//             return result.output
//         } else {
//             throw new Error('Hubo un error')
//         }

//     } catch (error) {
//         console.log(error)
//     }

// }

// export async function obtenerAlumnoId(id: Alumno['id_alumno']) {

//     try {
//         const url = `${import.meta.env.VITE_API_URL}/alumnos/${id}`
//         const { data } = await axios(url)
//         // console.log(data.data)
//         const result = safeParse(AlumnoSchema, data.data)

//         if (result.success) {

//             return result.output
//         } else {
//             throw new Error('Hubo un error')
//         }

//     } catch (error) {
//         console.log(error)
//     }

// }

// export async function actualizarAlumno(data: AlumnoData, id: Alumno['id_alumno']) {

//     try {

//         const result = safeParse(AlumnoSchema, {

//             nom_alumno: data.nom_alumno,
//             apell_alumno: data.apell_alumno,
//             dni: data.dni,
//             cuil: data.cuil,
//             fec_nacimiento: data.fec_nacimiento,
//             email: data.email,
//             celular: data.celular,
            
//         })

//         if (result.success) {
//             const url = `${import.meta.env.VITE_API_URL}/alumnos/${id}`
//             await axios.put(url, result.output)
//         }

//     } catch (error) {
//         console.log(error)
//     }

// }

