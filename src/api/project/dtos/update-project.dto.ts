import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Type } from '../enums/type.enum';

export class UpdateProjectDto implements Partial<Project> {
  @IsString()
  @Column({ nullable: true })
  @ApiProperty()
  url?: string;

  @IsString()
  @Column({ nullable: true })
  @ApiProperty()
  name?: string;

  @IsEnum(Type)
  @ApiProperty()
  type?: Type;
}
