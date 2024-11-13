import axios from "axios";
import { safeParse } from "valibot";
import { LoginPreceptoresSchema } from "../types/index";

type LoginData = {
    [key: string]: FormDataEntryValue;
};



// Configuración de la URL de la API
const LOGIN_URL = `${import.meta.env.VITE_API_URL}/login`;

// Función para hacer login
export async function login(data: LoginData): Promise<void> {

    try {
        // Realizar la solicitud POST hacia el backend
        const result = safeParse(LoginPreceptoresSchema, {
            username: data.username,
            password: data.password
        });

        if (!result.success) {
            console.log(result.issues);

            throw new Error('Formato incorrecto de los datos')
        };


        const response = await axios.post(LOGIN_URL, {
            username: result.output.username,
            password: result.output.password
        });

        const { authenticated } = response.data

        if (!authenticated) {
            throw new Error('usuario o contraseña incorrectos')

        }

        console.log('Login exitoso:', response.data)

    } catch (error: unknown) {
        console.error('Error en el login:', error);
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Error de autenticacion');
        }

        throw new Error('Error en el Login')
    }
}
