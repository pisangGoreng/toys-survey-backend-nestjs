import { Permission } from 'src/permission/models/permission.entity';
import { User } from 'src/user/models/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Unique(['name'])
@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => User, (user) => user.role)
  user: User[];

  // @ManyToMany(() => Permission, { cascade: true })
  // /*
  //   @JoinTable otomatis membuat table junction nya
  //   role_permissions
  //   role_id | permission_id
  // */
  // @JoinTable({
  //   name: 'role_permissions',
  //   joinColumn: { name: 'role_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  // })
  // permissions: Permission[];
}
