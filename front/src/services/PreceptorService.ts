import axios from "axios";
import { safeParse } from "valibot";
import { DrafPreceptorSchema } from "../types/index";


type PreceptorData = {
    [key: string]: FormDataEntryValue;
};


const PRECEPTOR_URL = `${import.meta.env.VITE_API_URL}/preceptor`;

export async function preceptor(data: PreceptorData): Promise<void> {

    try {

        const fechaActual = new Date();

        const result = safeParse(DrafPreceptorSchema, {
            nom_preceptor: data.nom_preceptor,
            apell_preceptor: data.apell_preceptor,
            dni: data.dni,
            email: data.email,
            celular: data.celular,
            username: data.username,
            password: data.password,
            createdAt: fechaActual,
            updatedAt: fechaActual
        });

        if (!result.success) {
            console.log(result.issues);

            throw new Error('Formato incorrecto de los datos')
        };

        const response = await axios.post(PRECEPTOR_URL, {
            nom_preceptor: result.output.nom_preceptor,
            apell_preceptor: result.output.apell_preceptor,
            dni: result.output.dni,
            email: result.output.email,
            celular: result.output.celular,
            username: result.output.username,
            password: result.output.password,
            createdAt: fechaActual,
            updatedAt: fechaActual

        });

        console.log('Registro exitoso:', response.data)

    } catch (error: unknown) {
        console.error('Error en al registrar los datos:', error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Error de registro');
        }

        throw new Error('Error en el registro')
    }


}

