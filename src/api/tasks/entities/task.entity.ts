import { Exclude, Transform } from 'class-transformer';
import { Project } from 'src/api/project/entities/project.entity';
import { Reports } from 'src/api/reports/entities/report.entity';
import { User } from 'src/api/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AuditEntity } from '../../../common/db/customBaseEntites/AuditEntity';
import { Status } from '../enums/status.enum';
import { Type } from '../enums/type.enum';

@Entity('tasks')
export class Task extends AuditEntity {
  @Column({ type: 'enum', nullable: false, enum: Type, default: Type.OTHER })
  type: Type;

  @Column({ length: 255 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  deadline: Date;

  @Column({
    type: 'enum',
    nullable: false,
    enum: Status,
    default: Status.OTHER,
  })
  status: Status;

  @ManyToMany(() => User, (user) => user.tasks)
  @JoinTable()
  users: User[];

  @ManyToOne(() => Project, (project) => project.tasks)
  projects: Project;
}
