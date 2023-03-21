import { Exclude } from 'class-transformer';
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
import { Type } from '../enums/type.enum';

@Entity('projects')
export class Project extends AuditEntity {
  @Column({ nullable: true })
  url: string;

  @Column()
  name: string;

  @Column({ type: 'enum', nullable: false, enum: Type, default: Type.OTHER })
  type: Type;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  @OneToMany(() => Reports, (report) => report.projects)
  reports: Reports[];
}
// @ManyToMany(
//   ()=>User, user=>user.projects,
//   {onDelete: 'NO ACTION', onUpdate:'NO ACTION'},

// )
// users: User[];
