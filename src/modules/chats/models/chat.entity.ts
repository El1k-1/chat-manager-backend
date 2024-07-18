import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { User } from "@modules/users/models/user.entity";
import { Message } from "@modules/messages/models/message.entity";

@Entity({name: 'Chats'})
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 64})
    name: string;

    @ManyToMany(() => User, user => user.chats)
    @JoinTable()
    users: User[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at?: Date;

    @OneToMany(() => Message, message => message.chat,{cascade:true})
    messages?: Message[];
}