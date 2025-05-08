import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Query } from './query.entity';

@Entity({ name: 'Query_types' })
export class QueryType {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 64, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  color: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  icon: string;

  @OneToMany(() => Query, query => query.type, {
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'CASCADE',
  })
  queries?: Query[];
}