import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Validate } from 'class-validator';
import { IsUnique } from 'src/common/decorators/validation.decorator';
import { Column } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Type } from '../enums/type.enum';

export class UpdateProjectDto implements Partial<Project> {
  @IsString()
  @ApiProperty()
  url?: string;

  @IsString()
  @Validate(IsUnique, [Project])
  @ApiProperty()
  name?: string;

  @IsEnum(Type)
  @ApiProperty()
  type?: Type;

  @ApiProperty({ type: [String] })
  userId?: string[];
}
