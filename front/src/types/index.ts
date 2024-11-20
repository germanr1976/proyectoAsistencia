import { object, string, number, array, InferOutput, date } from 'valibot';



// Esquema completo para validación de entrada (sin ID)
export const DrafAlumnoSchema = object({
    nom_alumno: string(),
    apell_alumno: string(),
    dni: string(),
    cuil: string(),
    fec_nacimiento: date(),
    email: string(),
    celular: string(),
    anio: string(),
    id_carrera: number(),
    createdAt: date(),
    updatedAt: date(),
});

// Tipo TypeScript generado para un Alumno
export type InsertAlumno = InferOutput<typeof DrafAlumnoSchema>;


// Esquema completo para listado de alumno en tabla asistencia
export const AlumnoSchema = object({
    id_alumno: number(),
    nom_alumno: string(),
    apell_alumno: string(),
    dni: string(),
    anio: string(),
    id_carrera: number()
    
});

export const AlumnosSchema = array(AlumnoSchema);

// Tipo TypeScript generado para un Alumno
export type InsertAlumnos = InferOutput<typeof AlumnoSchema>;
/-----------------------------------------------/
export const LoginPreceptoresSchema = object({
    username: string(),
    password: string()
});

export type LoginPreceptores = InferOutput<typeof LoginPreceptoresSchema>

/-------------------------------------------------------------------/

export const DrafPreceptorSchema = object({
    nom_preceptor: string(),
    apell_preceptor: string(),
    dni: string(),
    email: string(),
    celular: string(),
    username: string(),
    password: string(),
    createdAt: date(),
    updatedAt: date()

});

export type InsertPreceptores = InferOutput<typeof DrafPreceptorSchema>

/-------------------------------------------------------------------/


// Esquema completo para una Carrera (con ID)
export const CarreraSchema = object({
    id_carrera: number(),
    nom_carrera: string(),
    createdAt: date(),
    updatedAt: date()
});

// Esquema para un array de Carreras
export const CarrerasSchema = array(CarreraSchema);

// Tipo TypeScript generado para una Carrera
export type InsertCarreras = InferOutput<typeof CarreraSchema>;

// Esquema para el array de carreras (sin fechas)
export const DrafCarreraSchema = object({
    nom_carrera: string()
});

export const DrafCarrerasSchema = array(DrafCarreraSchema);

// Tipo TypeScript generado para un array de Carreras
export type cargarCarrera = InferOutput<typeof CarreraSchema>;

/-------------------------------------------------------------------/

// Esquema completo para una Asistencia (con ID)
export const AsistenciaSchema = object({
    //id_asistencia: number(),
    id_alumno: number(),
    fecha: string(),
    estado: string(),
    createdAt: date(),
    updatedAt: date()
});

// Tipo TypeScript generado para una Asistencia
export type InsertAsistencia = InferOutput<typeof AsistenciaSchema>;