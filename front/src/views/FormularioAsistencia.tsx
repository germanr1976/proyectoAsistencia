import { Form, ActionFunctionArgs, redirect, useLoaderData } from 'react-router-dom';
import { InsertAlumnos } from '../types/index';
import { obtenerAlumnos, registrarAsistencia } from '../services/AsistenciaService';
import { useState, useEffect } from 'react';

export async function loader() {
    try {
        const alumnos = await obtenerAlumnos();
        return alumnos || [];
    } catch (error) {
        console.error("Error al cargar los alumnos:", error);
        return [];
    }
}

export async function action({ request }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());
    console.log('datos enviados', data);

    // Valida que todos los campos requeridos estén completos
    if (Object.values(data).some(value => value === '')) {
        return 'Todos los campos son obligatorios';
    }

    // Formatea los datos de asistencia a enviar al backend
    const asistenciaData = {
        fecha: data.fecha as string,
        alumnos: Object.keys(data)
            .filter(key => key.startsWith('estado_'))
            .map(key => ({
                id_alumno: Number(key.split('_')[1]),
                estado: data[key] as 'Presente' | 'Ausente' | 'Justificada'
            }))
    };

    try {
        // Envía la asistencia al backend
        await registrarAsistencia(asistenciaData);
        return redirect('/');
    } catch (error: unknown) {
        if (error instanceof Error) {
            return error.message;
        }
    }
    return 'Error inesperado';
}

const FormularioAsistencia = () => {
    const alumnos = useLoaderData() as {
        seleccionado: any; id_alumno: number; nom_alumno: string; apell_alumno: string; dni: string; anio: string; id_carrera: number
    }[];
    const [selectedCarrera, setSelectedCarrera] = useState<number | null>(null);
    const [selectedAnio, setSelectedAnio] = useState<string | null>(null);
    const [filteredAlumnos, setFilteredAlumnos] = useState(alumnos);
    const [todosSeleccionados, setTodosSeleccionados] = useState(false);

    useEffect(() => {
        if (selectedCarrera !== null && selectedAnio !== null) {
            setFilteredAlumnos(alumnos.filter(alumno =>
                alumno.id_carrera === selectedCarrera && alumno.anio === selectedAnio
            ));
        } else {
            setFilteredAlumnos(alumnos);
        }
    }, [selectedCarrera, selectedAnio, alumnos]);

    const handleSeleccionarTodos = () => {
        setTodosSeleccionados(!todosSeleccionados);
        setFilteredAlumnos(prevAlumnos =>
            prevAlumnos.map(alumno => ({ ...alumno, seleccionado: !todosSeleccionados }))
        );
    };

    const handleSeleccionChange = (id_alumno: number) => {
        setFilteredAlumnos(prevAlumnos =>
            prevAlumnos.map(alumno =>
                alumno.id_alumno === id_alumno ? { ...alumno, seleccionado: !alumno.seleccionado } : alumno
            )
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
                    Registro de Asistencia
                </h2>
                <Form method="post" className="space-y-6">
                    <div>
                        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Fecha
                        </label>
                        <input
                            name="fecha"
                            id="fecha"
                            type="date"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="carrera" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Carrera
                        </label>
                        <select
                            id="carrera"
                            value={selectedCarrera || ''}
                            onChange={(e) => setSelectedCarrera(Number(e.target.value))}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            required
                        >
                            <option value="">Seleccione una carrera</option>
                            {[...new Set(alumnos.map(alumno => alumno.id_carrera))].map(id_carrera => (
                                <option key={id_carrera} value={id_carrera}>{id_carrera}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="anio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Año
                        </label>
                        <select
                            id="anio"
                            value={selectedAnio || ''}
                            onChange={(e) => setSelectedAnio(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            required
                        >
                            <option value="">Seleccione un año</option>
                            {[...new Set(alumnos.map(alumno => alumno.anio))].map(anio => (
                                <option key={anio} value={anio}>{anio}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={handleSeleccionarTodos}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {todosSeleccionados ? 'Desmarcar Todos' : 'Marcar Todos'}
                        </button>
                    </div>

                    <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mt-8 mb-6">
                        Listado de Alumnos
                    </h2>
                    <table className="min-w-full bg-white dark:bg-gray-800">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600">Nombre</th>
                                <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600">Apellido</th>
                                <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600">DNI</th>
                                <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600">Año</th>
                                <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600">Carrera</th>
                                <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600">Estado</th>
                                <th className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600">Seleccionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAlumnos.map(alumno => (
                                <tr key={alumno.id_alumno}>
                                    <td className="px-4 py-2 border-b border-gray-300 dark:text-gray-200">{alumno.nom_alumno}</td>
                                    <td className="px-4 py-2 border-b border-gray-300 dark:text-gray-200">{alumno.apell_alumno}</td>
                                    <td className="px-4 py-2 border-b border-gray-300 dark:text-gray-200">{alumno.dni}</td>
                                    <td className="px-4 py-2 border-b border-gray-300 dark:text-gray-200">{alumno.anio}</td>
                                    <td className="px-4 py-2 border-b border-gray-300 dark:text-gray-200">{alumno.id_carrera}</td>
                                    <td className="px-4 py-2 border-b border-gray-300 dark:text-gray-200">
                                        <select
                                            name={`estado_${alumno.id_alumno}`}
                                            className="form-select h-10 w-full text-indigo-600"
                                            required
                                        >
                                            <option value="Presente">Presente</option>
                                            <option value="Ausente">Ausente</option>
                                            <option value="Justificada">Justificada</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-300 dark:text-gray-200 text-center">
                                        <input
                                            type="checkbox"
                                            checked={alumno.seleccionado || todosSeleccionados}
                                            onChange={() => handleSeleccionChange(alumno.id_alumno)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Guardar Asistencia
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default FormularioAsistencia;
