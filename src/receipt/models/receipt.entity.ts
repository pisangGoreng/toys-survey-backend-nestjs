import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Employee } from 'src/employee/models/employee.entity';
import { User } from 'src/user/models/user.entity';

@Entity('receipts')
// @Unique(['receipt_no'])
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  receipt_no: string;

  @Column()
  rating: number;

  @Column()
  user_id: number;

  @Column()
  employee_id: number;

  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  // * RELATION
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
