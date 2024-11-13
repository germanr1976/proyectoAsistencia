import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Alumno from './Alumn.models';

@Table({
    tableName: 'Asistencias'
})
class Asistencia extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_asistencia: number;

    @ForeignKey(() => Alumno)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_alumno: number;

    @BelongsTo(() => Alumno)
    alumno: Alumno;

    @Column({
        type: DataType.DATEONLY,
        allowNull: false
    })
    fecha: Date;

    @Column({
        type: DataType.STRING(20),
        allowNull: false
    })
    estado: string;
}

export default Asistencia;