export const formatearNombre = (nombre: string): string => {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
};

// components/FormularioAsistencia.tsx
// ...
interface Alumno {
    nombre: string;
    presente: boolean;
}

const alumnos: Alumno[] = []; // Ensure alumnos is typed as an array of Alumno

const handleTogglePresencia = (index: number) => {
    alumnos[index].presente = !alumnos[index].presente;
    // You might want to trigger a re-render here if using a state management solution
};

<div>
    {alumnos.map((alumno: Alumno, index: number) => (
        <div key={index}>
            <label>
                <input
                    type="checkbox"
                    checked={alumno.presente}
                    onChange={() => handleTogglePresencia(index)}
                />
                {formatearNombre(alumno.nombre)}
            </label>
        </div>
    ))}
</div>