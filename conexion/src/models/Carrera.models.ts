import { Table, Column, Model, ForeignKey, BelongsTo, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import Preceptor from './Precept.models';
import Alumno from './Alumn.models';

@Table({
    tableName: 'Carreras',
})
class Carrera extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    id_carrera: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nom_carrera: string;

    // Clave foránea que referencia al preceptor a cargo de la carrera
    @ForeignKey(() => Preceptor)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    id_preceptor: number;

    // Relación con el modelo Preceptor
    @BelongsTo(() => Preceptor)
    preceptor: Preceptor;

    // Relación uno a muchos con Alumnos (una carrera puede tener múltiples alumnos)
    @HasMany(() => Alumno)
    alumnos: Alumno[];
}

export default Carrera;