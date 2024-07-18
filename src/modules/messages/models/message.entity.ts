import { Column, Entity, JoinColumn, ManyToOne, RelationId, PrimaryGeneratedColumn } from "typeorm";
import { User } from "@modules/users/models/user.entity";
import { Chat } from "@modules/chats/models/chat.entity";

@Entity({name: 'Messages'})
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Chat)
    @JoinColumn()
    chat: User;
    @RelationId((message: Message) => message.chat)
    @Column()
    chatId: number;

    @Column({type: 'varchar', length: 256})
    text: string;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;
    @RelationId((message: Message) => message.user)
    @Column()
    userId: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at?: Date;

}