import { Chat } from "@modules/chats/models/chat.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 64})
    username: string;

    @Column({type: 'varchar', length: 64})
    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at?: Date;

    @ManyToMany(() => Chat, chat => chat.users, {cascade: true})
    chats: Chat[]
}