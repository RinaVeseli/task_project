import { Exclude } from 'class-transformer';
import { Column, Entity, Index } from 'typeorm';
import { AuditEntity } from '../../../common/db/customBaseEntites/AuditEntity';
import { Type } from '../enums/type.enum';

@Entity('projects')
export class Project extends AuditEntity {

  @Column({ nullable: true })
  url: string;

  @Column()
  name: string;

  @Column({ type: 'enum', nullable:false, enum: Type, default:Type.OTHER })
  type: Type;


}
