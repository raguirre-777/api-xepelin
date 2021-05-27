import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('domain')
export class Domain extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  url: string;

  @Column({ type: 'varchar', default: 'ACTIVE', length: 8 })
  status: string;

}
