import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at?: Date;
}