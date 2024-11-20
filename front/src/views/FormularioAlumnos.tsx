import { Form, ActionFunctionArgs, redirect } from 'react-router-dom';
import { InsertAlumno } from "../types/index";
import { alumno } from '../services/AlumnoService';
import { obtenerCarreras } from "../services/CarreraService";
import { useEffect, useState } from 'react';

type RegistroAlumnoFormProps = {
    registroAlumno?: InsertAlumno;
}

interface Carrera {
    id_carrera: number;
    nom_carrera: string;
}

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    console.log('datos enviados', data);

    // Verifica que todos los campos sean obligatorios
    if (Object.values(data).some(value => value === '')) {
        return 'Todos los campos son obligatorios';
    }

    // Asegúrate de que data.id_carrera sea un número y data.anio sea una cadena antes de enviarlos
    const idCarreraValue = Number(data.id_carrera);
    const anioValue = data.anio as string;

    // Verificar que id_carrera es un número
    if (!isNaN(idCarreraValue)) {
        try {
            await alumno({


                nom_alumno: data.nom_alumno,
                apell_alumno: data.apell_alumno,
                dni: data.dni,
                cuil: data.cuil,
                fec_nacimiento: data.fec_nacimiento,
                email: data.email,
                celular: data.celular,
                anio: anioValue, // Mantener anio como cadena
                id_carrera: idCarreraValue.toString() // Convertir id_carrera a cadena
            });
            alert('Alumno registrado exitosamente'); // Mostrar mensaje de éxito

            return redirect('/');

        } catch (error: unknown) {
            if (error instanceof Error) {
                return error.message;
            }
        }
    } else {
        return 'El ID de la carrera debe ser un número';
    }

    return 'Error inesperado';
}

const RegistroAlumno = ({ registroAlumno }: RegistroAlumnoFormProps) => {
    const [carreras, setCarreras] = useState<Carrera[]>([]);

    useEffect(() => {
        obtenerCarreras()
            .then(data => {
                console.log('Datos obtenidos en el componente:', data); // Verifica aquí
                if (Array.isArray(data) && data.length > 0) {
                    setCarreras(data);
                } else {
                    console.error("No se encontraron carreras.");
                }
            })
            .catch(error => console.error('Error al obtener las carreras:', error));
    }, []);

    return (
        <section className="p-6 bg-background text-black dark:bg-gray-800 dark:text-white">
            <Form method="POST" className="container flex flex-col items-center mx-auto space-y-6 max-w-lg">
                <fieldset className="w-full gap-4 p-6 rounded-md shadow-sm bg-white dark:bg-gray-900">
                    <div className="space-y-2">
                        <p className="font-medium text-center text-black dark:text-white">Información del Alumno</p>
                        <p className="text-xs text-center text-gray-600 dark:text-gray-300">Ingresar los datos para que quede registrado y pueda acceder al sistema!</p>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <label htmlFor="nom_alumno" className="text-sm text-black dark:text-white">Nombre</label>
                            <input
                                defaultValue={registroAlumno?.nom_alumno}
                                name="nom_alumno"
                                id="nom_alumno"
                                type="text"
                                placeholder="Nombre"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-900 dark:bg-gray-50 focus:dark:ring-blue-600 dark:border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="apell_alumno" className="text-sm text-black dark:text-white">Apellido</label>
                            <input
                                defaultValue={registroAlumno?.apell_alumno}
                                name="apell_alumno"
                                id="apell_alumno"
                                type="text"
                                placeholder="Apellido"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-900 dark:bg-gray-50 focus:dark:ring-blue-600 dark:border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="dni" className="text-sm text-black dark:text-white">Número de Documento</label>
                            <input
                                defaultValue={registroAlumno?.dni}
                                name="dni"
                                id="dni"
                                type="text"
                                placeholder="DNI"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-900 dark:bg-gray-50 focus:dark:ring-blue-600 dark:border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="cuil" className="text-sm text-black dark:text-white">CUIL</label>
                            <input
                                defaultValue={registroAlumno?.cuil}
                                name="cuil"
                                id="cuil"
                                type="text"
                                placeholder="CUIL"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-900 dark:bg-gray-50 focus:dark:ring-blue-600 dark:border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="fec_nacimiento" className="text-sm text-black dark:text-white">Fecha de Nacimiento</label>
                            <input
                                defaultValue={registroAlumno?.fec_nacimiento ? new Date(registroAlumno.fec_nacimiento).toISOString().split('T')[0] : ''}
                                name="fec_nacimiento"
                                id="fec_nacimiento"
                                type="date"
                                placeholder="fecha nacimiento"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-900 dark:bg-gray-50 focus:dark:ring-blue-600 dark:border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm text-black dark:text-white">Email</label>
                            <input
                                defaultValue={registroAlumno?.email}
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
                                defaultValue={registroAlumno?.celular}
                                name="celular"
                                id="celular"
                                type="text"
                                placeholder="Celular"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-900 dark:bg-gray-50 focus:dark:ring-blue-600 dark:border-gray-300 text-black"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="id_carrera" className="text-sm text-black dark:text-white">Carrera</label>
                            <select
                                name="id_carrera"
                                id="id_carrera"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-900 dark:bg-gray-50 focus:dark:ring-blue-600 dark:border-gray-300 text-black"
                                required
                            >
                                <option value="">Seleccione una carrera</option>
                                {Array.isArray(carreras) && carreras.map(carrera => (
                                    <option key={carrera.id_carrera} value={carrera.id_carrera.toString()}>{carrera.nom_carrera}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="anio" className="text-sm text-black dark:text-white">Año</label>
                            <input
                                defaultValue={registroAlumno?.anio}
                                name="anio"
                                id="anio"
                                type="text"
                                placeholder="Año"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 dark:text-gray-900 dark:bg-gray-50 focus:dark:ring-blue-600 dark:border-gray-300 text-black"
                                required
                            />
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
};

export default RegistroAlumno;