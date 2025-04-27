import { Query } from "@modules/query/models/query.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Cars'})
export class Cars {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "integer"})
    price: number;

    @Column({type: 'varchar', length: 256})
    image: string;

    @Column({type: 'varchar', length: 64})
    name: string;

    @OneToMany(() => Query, query => query.car, {
        cascade: ['insert', 'update', 'remove'],
        onDelete: 'CASCADE',
      })
      queries?: Query[];

}