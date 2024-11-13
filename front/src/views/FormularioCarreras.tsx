import { Form, ActionFunctionArgs, redirect, useLoaderData } from 'react-router-dom';
import { InsertCarreras } from '../types/index';
import { carrera, obtenerCarreras, eliminarCarrera } from '../services/CarreraService';
import { useState } from 'react';

export async function loader() {
    try {
        const carreras = await obtenerCarreras();
        return carreras || []; // Devuelve un array vacío si no hay carreras
    } catch (error) {
        console.error("Error al cargar las carreras:", error);
        return []; // Devuelve un array vacío en caso de error
    }
}

type RegistroCarreraFormProps = {
    registroCarrera?: InsertCarreras;
}

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    console.log('datos enviados', data);

    if (Object.values(data).some(value => value === '')) {
        return 'Todos los campos son obligatorios';
    }

    try {
        await carrera(data);
        return redirect('/');
    } catch (error: unknown) {
        if (error instanceof Error) {
            return error.message;
        }
    }
    return 'Error inesperado';
}

const RegistroCarrera = ({ registroCarrera }: RegistroCarreraFormProps) => {
    const carreras = useLoaderData() as { id_carrera: number; nom_carrera: string }[];
    const [editCarrera, setEditCarrera] = useState<{ id_carrera: number; nom_carrera: string } | null>(null);

    const handleEdit = (carrera: { id_carrera: number; nom_carrera: string }) => {
        setEditCarrera(carrera);
    };

    const handleCancelEdit = () => {
        setEditCarrera(null);
    };

    const handleDelete = async (id: number) => {
        if (confirm('¿Estás seguro de que deseas eliminar esta carrera?')) {
            try {
                await eliminarCarrera(id);
                window.location.reload(); // Recargar la página para actualizar la lista de carreras
            } catch (error) {
                console.error('Error al eliminar la carrera:', error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
                    Alta, Baja y Modificación Carreras
                </h2>
                <Form method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="nom_carrera" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nombre Carrera
                        </label>
                        <input
                            defaultValue={editCarrera?.nom_carrera || registroCarrera?.nom_carrera}
                            name="nom_carrera"
                            id="nom_carrera"
                            type="text"
                            placeholder="Nombre Carrera"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {editCarrera ? 'Guardar Cambios' : 'Agregar Carrera'}
                        </button>
                        {editCarrera && (
                            <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </Form>
                <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mt-8 mb-6">
                    Listado de Carreras
                </h2>
                <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600">ID</th>
                            <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600">Nombre Carrera</th>
                            <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carreras.map((carrera) => (
                            <tr key={carrera.id_carrera}>
                                <td className="px-4 py-2 border-b border-gray-300 dark:text-gray-200">{carrera.id_carrera}</td>
                                <td className="px-4 py-2 border-b border-gray-300 dark:text-gray-200">{carrera.nom_carrera}</td>
                                <td className="px-4 py-2 border-b border-gray-300 dark:text-gray-200">
                                    <button
                                        onClick={() => handleEdit(carrera)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(carrera.id_carrera)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegistroCarrera;