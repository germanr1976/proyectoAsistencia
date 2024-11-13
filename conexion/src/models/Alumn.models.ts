import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import Carrera from './Carrera.models';
import Asistencia from './Asistencia.models'; // Importa el modelo Asistencia

@Table({
    tableName: 'Alumnos'
})
class Alumno extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_alumno: number;

    @Column({
        type: DataType.STRING(40),
        allowNull: false
    })
    nom_alumno: string;

    @Column({
        type: DataType.STRING(40),
        allowNull: false
    })
    apell_alumno: string;

    @Unique
    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    dni: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    cuil: string;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    fec_nacimiento: Date;

    @Column({
        type: DataType.STRING(40),
        allowNull: false
    })
    email: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: false
    })
    celular: string;

    // Campo adicional para el año en curso del alumno
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    anio: string;

    // Relación con la carrera
    @ForeignKey(() => Carrera)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_carrera: number;

    @BelongsTo(() => Carrera)
    carrera: Carrera;

    // Relación uno a muchos entre Alumnos y Asistencias
    @HasMany(() => Asistencia)
    asistencias: Asistencia[];
}

export default Alumno;