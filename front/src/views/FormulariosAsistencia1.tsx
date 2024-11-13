import React, { useState, useEffect } from 'react';
import { obtenerCarreras } from '../services/CarreraService';
import { obtenerAlumnosPorCarreraYAnio, registrarAsistencia } from '../services/AsistenciaService';
import { obtenerAlumno } from '../services/AlumnoService';

interface Alumno {
    id_alumno: number;
    nom_alumno: string;
    apell_alumno: string;
    dni: string;
    estado: 'Presente' | 'Ausente';
    seleccionado: boolean;
}

interface Carrera {
    id: number;
    nombre: string;
}

const FormularioAsistencia1: React.FC = () => {
    const [carreras, setCarreras] = useState<Carrera[]>([]);
    const [carreraSeleccionada, setCarreraSeleccionada] = useState<number | null>(null);
    const [anioSeleccionado, setAnioSeleccionado] = useState<string | null>(null);
    const [fecha, setFecha] = useState('');
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [anios, setAnios] = useState<string[]>([]);

    useEffect(() => {
        obtenerCarreras()
            .then(data => {
                if (data) {
                    setCarreras(data.map(c => ({
                        id: c.id_carrera,
                        nombre: c.nom_carrera
                    })));
                }
            })
            .catch(error => console.error('Error al obtener las carreras:', error));
    }, []);

    useEffect(() => {
        if (carreraSeleccionada) {
            obtenerAlumno()
                .then(data => {
                    if (data) {
                        // Filtrar solo los alumnos que pertenecen a la carrera seleccionada y obtener años únicos
                        const añosUnicos = Array.from(new Set(
                            data
                                .filter((alumno: any) => alumno.id_carrera === carreraSeleccionada)
                                .map((alumno: any) => alumno.anio)
                        ));
                        setAnios(añosUnicos);
                    }
                })
                .catch(error => console.error('Error al obtener los años de los alumnos:', error));
        } else {
            setAnios([]);
        }
        setAnioSeleccionado(null);
    }, [carreraSeleccionada]);


    useEffect(() => {
        if (carreraSeleccionada && anioSeleccionado !== null) {
            obtenerAlumnosPorCarreraYAnio(carreraSeleccionada, anioSeleccionado)
                .then(data => setAlumnos(data.map((alumno: any) => ({
                    id_alumno: alumno.id_alumno,
                    nom_alumno: alumno.nom_alumno,
                    apell_alumno: alumno.apell_alumno,
                    dni: alumno.dni,
                    estado: 'Ausente',
                    seleccionado: false
                }))))
                .catch(error => console.error('Error al obtener los alumnos:', error));
        } else {
            setAlumnos([]);
        }
    }, [carreraSeleccionada, anioSeleccionado]);

    const handleCarreraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCarreraSeleccionada(Number(e.target.value));
        setAnioSeleccionado(null);
        setAlumnos([]);
    };

    const handleAnioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAnioSeleccionado(e.target.value);
    };

    const handleEstadoChange = (id_alumno: number, estado: 'Presente' | 'Ausente') => {
        setAlumnos(prevAlumnos =>
            prevAlumnos.map(alumno =>
                alumno.id_alumno === id_alumno ? { ...alumno, estado } : alumno
            )
        );
    };

    const handleSeleccionChange = (id_alumno: number) => {
        setAlumnos(prevAlumnos =>
            prevAlumnos.map(alumno =>
                alumno.id_alumno === id_alumno ? { ...alumno, seleccionado: !alumno.seleccionado } : alumno
            )
        );
    };

    const handleSeleccionarTodos = () => {
        const allSelected = alumnos.every(alumno => alumno.seleccionado);
        setAlumnos(prevAlumnos =>
            prevAlumnos.map(alumno => ({ ...alumno, seleccionado: !allSelected }))
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registrarAsistencia({
                fecha,
                alumnos: alumnos.filter(a => a.seleccionado).map(a => ({
                    id_alumno: a.id_alumno,
                    estado: a.estado
                }))
            });
            alert('Asistencia registrada exitosamente');
        } catch (error) {
            console.error('Error al registrar la asistencia:', error);
            alert('Error al registrar la asistencia');
        }
    };

    return (
        <div className="p-6 bg-background text-black dark:bg-gray-800 dark:text-white">
            <form onSubmit={handleSubmit} className="container flex flex-col items-center mx-auto space-y-6 max-w-lg">
                <fieldset className="w-full gap-4 p-6 rounded-md shadow-sm bg-black dark:bg-gray-900">
                    <div className="space-y-2">
                        <p className="font-medium text-center">Registro de Asistencia</p>
                        <p className="text-xs text-center text-gray-600">Selecciona la carrera y el año para ver los alumnos</p>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <label htmlFor="carrera" className="text-sm">Carrera</label>
                            <select
                                id="carrera"
                                value={carreraSeleccionada || ''}
                                onChange={handleCarreraChange}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm text-black dark:text-white bg-white dark:bg-gray-700"
                                required
                            >
                                <option value="" className="text-black dark:text-white">Seleccione una carrera</option>
                                {carreras.map(c => (
                                    <option key={c.id} value={c.id} className="text-black dark:text-white">{c.nombre}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="anio" className="text-sm">Año</label>
                            <select
                                id="anio"
                                value={anioSeleccionado || ''}
                                onChange={handleAnioChange}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm text-black dark:text-white bg-white dark:bg-gray-700"
                                required
                            >
                                <option value="" className="text-black dark:text-white">Seleccione el año</option>
                                {anios.map(anio => (
                                    <option key={anio} value={anio} className="text-black dark:text-white">{anio}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fecha" className="text-sm">Fecha</label>
                            <input
                                type="date"
                                id="fecha"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg shadow-sm text-black dark:text-white bg-white dark:bg-gray-700"
                                required
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset className="w-full gap-4 p-6 rounded-md shadow-sm bg-white dark:bg-gray-900">
                    <div className="flex justify-between items-center">
                        <p className="font-medium text-center">Lista de Alumnos</p>
                        <button type="button" onClick={handleSeleccionarTodos} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                            {alumnos.every(a => a.seleccionado) ? 'Desmarcar Todos' : 'Marcar Todos'}
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4">
                        {alumnos.map(alumno => (
                            <div key={alumno.id_alumno} className="flex items-center justify-between p-2 border rounded">
                                <div>
                                    <p className="text-sm font-semibold">{alumno.nom_alumno} {alumno.apell_alumno}</p>
                                    <p className="text-xs text-gray-600">DNI: {alumno.dni}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={alumno.estado}
                                        onChange={(e) => handleEstadoChange(alumno.id_alumno, e.target.value as 'Presente' | 'Ausente')}
                                        className="px-2 py-1 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-700"
                                    >
                                        <option value="Presente" className="text-black dark:text-white">Presente</option>
                                        <option value="Ausente" className="text-black dark:text-white">Ausente</option>
                                    </select>
                                    <input
                                        type="checkbox"
                                        checked={alumno.seleccionado}
                                        onChange={() => handleSeleccionChange(alumno.id_alumno)}
                                        className="w-4 h-4 border rounded"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </fieldset>
                <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-lg">Registrar Asistencia</button>
            </form>
        </div>
    );
};

export default FormularioAsistencia1;
