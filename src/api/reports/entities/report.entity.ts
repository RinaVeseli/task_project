import { Project } from 'src/api/project/entities/project.entity';
import { User } from 'src/api/user/entities/user.entity';
import { AuditEntity } from 'src/common/db/customBaseEntites/AuditEntity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ReportTYPE } from '../enums/type_file.enum';

@Entity('reports')
export class Reports extends AuditEntity {
  @Column()
  name: string;

  @Column()
  url: string;

  @Column({
    type: 'enum',
    nullable: false,
    enum: ReportTYPE,
    default: ReportTYPE.OTHER,
  })
  file_type: ReportTYPE;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  @ManyToOne(() => Project, (project) => project.reports)
  projects: Project;
}
