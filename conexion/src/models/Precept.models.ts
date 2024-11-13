import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import Carrera from './Carrera.models';

@Table({
    tableName: 'Preceptores',
})
class Preceptor extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    id_preceptor: number;

    @Column({
        type: DataType.STRING(40),
        allowNull: false,
    })
    nom_preceptor: string;

    @Column({
        type: DataType.STRING(40),
        allowNull: false,
    })
    apell_preceptor: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    dni: string;

    @Column({
        type: DataType.STRING(40),
        allowNull: false,
        unique: true,  // Hacer el email único
    })
    email: string;

    @Column({
        type: DataType.STRING(20),
        allowNull: true,
    })
    celular: string;  // Asegúrate de usar STRING si incluyes guiones o paréntesis en el número

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,  // El username debe ser único
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;  // Usar 'password_hash' en lugar de 'password'

    // Relación: Un preceptor tiene muchas carreras
    @HasMany(() => Carrera)
    carreras: Carrera[];
}

export default Preceptor;
