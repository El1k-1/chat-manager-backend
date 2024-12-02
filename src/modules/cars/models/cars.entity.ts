import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Cars'})
export class Cars {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "integer"})
    price: number;

    @Column({type: 'varchar', length: 256})
    image: string;

}