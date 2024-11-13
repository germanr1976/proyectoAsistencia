import { useState } from "react";
import { Form, ActionFunctionArgs, redirect } from "react-router-dom"
import { preceptor } from "../services/PreceptorService";
import { InsertPreceptores } from "../types/index";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
//import ErrorMsj from "./ErrorMsj";


type RegistroPreceptorFormProps = {

    registroPreceptor?: InsertPreceptores;
};

export async function action({ request }: ActionFunctionArgs) {

    const data = Object.fromEntries(await request.formData());
    console.log('datos enviados', data)
    if (Object.values(data).some(value => value === '')) {

        return 'Todos los campos son obligatorios'
    }

    try {
        await preceptor(data);
        return redirect('/login')
    } catch (error: unknown) {

        if (error instanceof Error) {
            return error.message;
        }

    }
    return 'Error inesperado';
}


const RegistroPreceptor = ({ registroPreceptor }: RegistroPreceptorFormProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    //     const error = useActionData() as string;

    return (
        <section className="p-6 bg-background text-black dark:bg-gray-800 dark:text-white">
            <Form method="POST" className="container flex flex-col items-center mx-auto space-y-6 max-w-lg">
                <fieldset className="w-full gap-4 p-6 rounded-md shadow-sm bg-white dark:bg-gray-900">
                    <div className="space-y-2">
                        <p className="font-medium text-center text-black dark:text-white">Información del Preceptor</p>
                        <p className="text-xs text-center text-gray-600 dark:text-gray-300">Ingresar los datos para que quede registrado y pueda acceder al sistema!</p>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <label htmlFor="firstname" className="text-sm text-black dark:text-white">Nombre</label>
                            <input
                                defaultValue={registroPreceptor?.nom_preceptor}
                                name="nom_preceptor"
                                id="nom_preceptor"
                                type="text"
                                placeholder="Nombre"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-900 dark:bg-gray-50 focus:dark:ring-blue-600 dark:border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="text-sm text-black dark:text-white">Apellido</label>
                            <input
                                defaultValue={registroPreceptor?.apell_preceptor}
                                name="apell_preceptor"
                                id="apell_preceptor"
                                type="text"
                                placeholder="Apellido"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-900 dark:bg-gray-50 focus:dark:ring-blue-600 dark:border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="dni" className="text-sm text-black dark:text-white">Número de Documento</label>
                            <input
                                defaultValue={registroPreceptor?.dni}
                                name="dni"
                                id="dni"
                                type="text"
                                placeholder="DNI"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-900 dark:bg-gray-50 focus:dark:ring-blue-600 dark:border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm text-black dark:text-white">Email</label>
                            <input
                                defaultValue={registroPreceptor?.email}
                                name="email"
                                id="email"
                                type="text"
                                placeholder="Email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-900 dark:bg-gray-50 focus:dark:ring-blue-600 dark:border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="celular" className="text-sm text-black dark:text-white">Celular</label>
                            <input
                                defaultValue={registroPreceptor?.celular}
                                name="celular"
                                id="celular"
                                type="text"
                                placeholder="Celular"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-900 dark:bg-gray-50 focus:dark:ring-blue-600 dark:border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="usuario" className="text-sm text-black dark:text-white">Nombre de Usuario</label>
                            <input
                                defaultValue={registroPreceptor?.username}
                                name="username"
                                id="username"
                                type="text"
                                placeholder="Usuario"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-900 dark:bg-gray-50 focus:dark:ring-blue-600 dark:border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-black dark:text-white">Contraseña</label>
                            <div className="relative">
                                <input
                                    name="password"
                                    id="password"
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Contraseña"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-black"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-600"
                                >
                                    {passwordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-violet-700 hover:bg-violet-800 text-white py-2.5 rounded-lg text-center font-medium transition duration-150 ease-in-out shadow-md"
                        >
                            Registrarse
                        </button>
                    </div>
                </fieldset>
            </Form>
        </section>


    );

}

export default RegistroPreceptor
