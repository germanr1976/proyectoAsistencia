import React from 'react';

interface Alumno {
    id_alumno: number;
    nom_alumno: string;
    apell_alumno: string;
    estado: string;
}

interface ReporteAsistenciaProps {
    fecha: string;
    alumnos: Alumno[];
}

const ReporteAsistencia: React.FC<ReporteAsistenciaProps> = ({ fecha, alumnos }) => {
    return (
        <div className="p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Reporte de Asistencia - {fecha}
            </h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Nombre</th>
                        <th className="py-2 px-4 border-b">Apellido</th>
                        <th className="py-2 px-4 border-b">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {alumnos.map(alumno => (
                        <tr key={alumno.id_alumno}>
                            <td className="py-2 px-4 border-b">{alumno.id_alumno}</td>
                            <td className="py-2 px-4 border-b">{alumno.nom_alumno}</td>
                            <td className="py-2 px-4 border-b">{alumno.apell_alumno}</td>
                            <td className="py-2 px-4 border-b">{alumno.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReporteAsistencia;