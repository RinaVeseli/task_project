import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserGender } from '../enums/userGender.enum';
import { UserRoles } from '../enums/roles.enum';
import { AuditEntity } from '../../../common/db/customBaseEntites/AuditEntity';
import { Project } from 'src/api/project/entities/project.entity';
import { Reports } from 'src/api/reports/entities/report.entity';
import { Task } from 'src/api/tasks/entities/task.entity';
import { Media } from 'src/api/media/entities/media.entity';

@Entity('users')
export class User extends AuditEntity {
  @Column({
    type: 'enum',
    default: UserRoles.ADMIN,
    enum: UserRoles,
  })
  role: UserRoles;
  @Column({ default: false })
  isRoleOverridden: boolean;

  @Column({ type: 'integer', default: 1 })
  permissions: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  middle_name: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  hashedRt: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: UserGender,
    default: UserGender.OTHER,
  })
  gender: UserGender;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  timezone: string;

  @Column({ nullable: true })
  isVerified: boolean;
  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  status: boolean;

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Reports, (report) => report.user)
  reports: Reports[];

  @ManyToMany(() => Task, (task) => task.users)
  tasks: Task[];

  @ManyToMany(() => Project, (project) => project.users)
  projects: Project[];

  @OneToMany(() => Media, (media) => media.user)
  medias: Media[];
}
