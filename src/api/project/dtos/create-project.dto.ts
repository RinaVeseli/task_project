import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { User } from 'src/api/user/entities/user.entity';
import { IsUnique } from 'src/common/decorators/validation.decorator';
import { Project } from '../entities/project.entity';
import { Type } from '../enums/type.enum';

export class CreateProjectDto implements Partial<Project> {
  @IsString()
  @ApiProperty()
  url: string;

  @IsString()
  @Validate(IsUnique, [Project])
  @ApiProperty()
  name: string;

  @IsEnum(Type)
  @ApiProperty()
  type: Type;

  @ApiProperty({ type: [String] })
  userId?: string[];
}
