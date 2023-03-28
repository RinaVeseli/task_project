import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/api/user/entities/user.entity';
import { Project } from '../entities/project.entity';
import { Type } from '../enums/type.enum';

export class CreateProjectDto implements Partial<Project> {
  @IsString()
  @ApiProperty()
  url: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsEnum(Type)
  @ApiProperty()
  type: Type;

  // @ArrayNotEmpty()
  @ApiProperty({ type: [String] })
  userId?: string[];
}
