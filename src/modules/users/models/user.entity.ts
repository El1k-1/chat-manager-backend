import { Query } from "@modules/query/models/query.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 64})
    login: string;

    @Column({type: 'varchar', length: 64})
    password: string;

    @Column({type: 'varchar', length: 64})
    token: string;

    @Column({type: 'varchar', length: 64})
    email: string;

    @Column({type: 'int', nullable: true, default: () => '1' })
    permission_id: number;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at?: Date;

    @OneToMany(() => Query, query => query.type, {
        cascade: ['insert', 'update', 'remove'],
        onDelete: 'CASCADE',
      })
    queries?: Query[];
}