import React, { useState, useEffect, useRef } from 'react';
import { Form, ActionFunctionArgs, redirect, useLoaderData } from 'react-router-dom';
import { obtenerAlumnos, registrarAsistencia } from '../services/AsistenciaService';
import ReporteAsistencia from '../components/ReporteAsistencia';

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

    // Verificar que todos los campos estén completos
    if (Object.values(data).some(value => value === '')) {
        return 'Todos los campos son obligatorios';
    }

    const asistenciaData = {
        fecha: data.fecha as string,
        alumnos: Object.keys(data)
            .filter(key => key.startsWith('estado_'))
            .map(key => ({
                id_alumno: Number(key.split('_')[1]),
                estado: data[key] as string
            }))
    };

    console.log('Datos transformados para enviar:', asistenciaData);

    try {
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
    const alumnos = useLoaderData() as { id_alumno: number, nom_alumno: string, apell_alumno: string, anio: string, id_carrera: number, nom_carrera: string }[];
    const [selectedCarrera, setSelectedCarrera] = useState<string | null>(null);
    const [selectedAnio, setSelectedAnio] = useState<string | null>(null);
    const [filteredAlumnos, setFilteredAlumnos] = useState(alumnos);
    const [fecha, setFecha] = useState('');
    const [estadoAlumnos, setEstadoAlumnos] = useState<{ [id: number]: string }>({});
    const [currentPage, setCurrentPage] = useState(1);
    const alumnosPerPage = 10;
    const [showReport, setShowReport] = useState(false);
    const reportRef = useRef<HTMLDivElement>(null);
    const [message, setMessage] = useState<string | null>(null); // Estado para el mensaje

    useEffect(() => {
        if (selectedCarrera && selectedAnio) {
            setFilteredAlumnos(alumnos.filter(alumno => alumno.nom_carrera === selectedCarrera && alumno.anio === selectedAnio));
        } else {
            setFilteredAlumnos(alumnos);
        }
    }, [selectedCarrera, selectedAnio, alumnos]);

    const handleEstadoChange = (id_alumno: number, estado: string) => {
        setEstadoAlumnos(prev => ({ ...prev, [id_alumno]: estado }));
    };

    const hideMessageAfterTimeout = () => {
        setTimeout(() => {
            setMessage(null);
        }, 3000); // 3 segundos
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const asistenciaData = {
            fecha,
            alumnos: filteredAlumnos.map(alumno => ({
                id_alumno: alumno.id_alumno,
                estado: estadoAlumnos[alumno.id_alumno] || 'Ausente', // Valor por defecto
            }))
        };
        try {
            await registrarAsistencia(asistenciaData);
            setMessage('Asistencia registrada exitosamente');
            hideMessageAfterTimeout();
        } catch (error) {
            console.error('Error al registrar la asistencia:', error);
            setMessage('Error al registrar la asistencia');
            hideMessageAfterTimeout();
        }
    };

    const handlePrint = () => {
        setShowReport(true);
        setTimeout(() => {
            if (reportRef.current) {
                window.print();
            }
        }, 500);
    };

    // Calcular los alumnos a mostrar en la página actual
    const indexOfLastAlumno = currentPage * alumnosPerPage;
    const indexOfFirstAlumno = indexOfLastAlumno - alumnosPerPage;
    const currentAlumnos = filteredAlumnos.slice(indexOfFirstAlumno, indexOfLastAlumno);

    // Cambiar de página
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">
                    Registro de Asistencia
                </h2>
                {message && (
                    <div className="mb-4 text-center text-sm text-green-600 bg-green-100 p-2 rounded">
                        {message}
                    </div>
                )}
                <Form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Fecha
                        </label>
                        <input
                            name="fecha"
                            id="fecha"
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
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
                            onChange={(e) => setSelectedCarrera(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                            required
                        >
                            <option value="">Seleccione una carrera</option>
                            {[...new Set(alumnos.map(alumno => alumno.nom_carrera))].map(carrera => (
                                <option key={carrera} value={carrera}>{carrera}</option>
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
                    <div className="space-y-4">
                        {currentAlumnos.map(alumno => (
                            <div key={alumno.id_alumno} className="flex items-center space-x-4">
                                <span className="flex-1 text-gray-700 dark:text-gray-300">{alumno.nom_alumno} {alumno.apell_alumno}</span>
                                <select
                                    onChange={(e) => handleEstadoChange(alumno.id_alumno, e.target.value)}
                                    className="form-select h-10 w-40 text-indigo-600"
                                >
                                    <option value="Presente">Presente</option>
                                    <option value="Ausente">Ausente</option>
                                </select>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <div>
                            {Array.from({ length: Math.ceil(filteredAlumnos.length / alumnosPerPage) }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-700'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                        <div className="flex space-x-4">
                            <button
                                type="button"
                                onClick={handlePrint}
                                className="px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Imprimir Reporte
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Registrar Asistencia
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
            {showReport && (
                <div ref={reportRef} className="hidden">
                    <ReporteAsistencia
                        fecha={fecha}
                        alumnos={filteredAlumnos.map(alumno => ({
                            id_alumno: alumno.id_alumno,
                            nom_alumno: alumno.nom_alumno,
                            apell_alumno: alumno.apell_alumno,
                            estado: estadoAlumnos[alumno.id_alumno] || 'Ausente'
                        }))}
                    />
                </div>
            )}
        </div>
    );
};

export default FormularioAsistencia;