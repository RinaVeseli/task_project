import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from '../enums/type.enum';
import { Status } from '../enums/status.enum';
import { Task } from '../entities/task.entity';

export class CreateTaskDto implements Partial<Task> {
  @IsEnum(Type)
  @ApiProperty()
  type: Type;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @ApiProperty()
  deadline: Date;

  @IsEnum(Status)
  @ApiProperty()
  status: Status;

  @ApiProperty()
  projectId?: string;
}
