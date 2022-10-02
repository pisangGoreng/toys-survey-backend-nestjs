import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/user/models/user.entity';
import { Exclude } from 'class-transformer';

@Entity('employees')
@Unique(['nik'])
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nik: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  image_url: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;
}
