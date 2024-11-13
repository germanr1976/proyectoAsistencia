import { Link, Form, ActionFunctionArgs, useActionData, redirect } from "react-router-dom"
import { login } from "../services/AuthService";
import { LoginPreceptores } from "../types/index"
import ErrorMsj from "./ErrorMsj";


type LoginFormProps = {
    login?: LoginPreceptores;
};

export async function action({ request }: ActionFunctionArgs) {


    const data = Object.fromEntries(await request.formData());
    if (Object.values(data).some(value => value === '')) {

        return 'Todos los campos son obligatorios'
    }

    try {
        await login(data);
        return redirect('/')
    } catch (error: unknown) {

        if (error instanceof Error) {
            return error.message;
        }

    }
    return 'Error inesperado';
}


const LoginForm = ({ login }: LoginFormProps) => {
    const error = useActionData() as string;

    return (
        <div className="flex items-center justify-center min-h-screen dark:bg-gray-800">
            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">
                        Iniciar sesión
                    </h1>
                    <p className="text-sm dark:text-gray-600">
                        Inicie sesión para acceder a su cuenta
                    </p>
                </div>
                <Form method="POST" >
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm">
                                Nombre de Usuario
                            </label>
                            <input
                                defaultValue={login?.username}
                                type="text"  // Cambia 'email' por 'text'
                                name="username"  // Cambia el nombre a 'username'
                                id="username"  // Cambia el id a 'username'
                                placeholder="nombre de usuario"
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">
                                    Contraseña
                                </label>
                                <Link to="/forgot-password" className="text-xs hover:underline dark:text-gray-600">
                                    ¿Has olvidado tu contraseña?
                                </Link>
                            </div>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="*****"
                                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <button
                            type="submit"
                            className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
                        >
                            Iniciar sesión
                        </button>
                        {error && <ErrorMsj>{error}</ErrorMsj>}
                        <p className="px-6 text-sm text-center dark:text-gray-600">
                            ¿Aún no tienes una cuenta?
                            <Link to="/preceptor" className="hover:underline dark:text-violet-600">
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>
        </div>

    )
}

export default LoginForm;
