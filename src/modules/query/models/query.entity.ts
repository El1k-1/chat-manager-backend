import { Cars } from "@modules/cars/models/cars.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { QueryType } from "./query-type.entity";
import { User } from "@modules/users/models/user.entity";

@Entity({name: 'Query'})
export class Query {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => QueryType, t => t.queries)
    @JoinColumn()
    type?: QueryType;
    @RelationId((query: Query) => query.type)
    @Column()
    typeId?: number;
    

    @ManyToOne(() => User, u => u.queries)
    @JoinColumn()
    fromUser?: User;
    @RelationId((query: Query) => query.fromUser)
    @Column()
    userId?: number;

    @ManyToOne(() => Cars, c => c.queries)
    @JoinColumn()
    car?: Cars;
    @RelationId((query: Query) => query.car)
    @Column()
    carId?: number;


}