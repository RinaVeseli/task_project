import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { Task } from '../entities/task.entity';
import { Status } from '../enums/status.enum';
import { Type } from '../enums/type.enum';

export class UpdateTaskDto implements Partial<Task> {
  @IsEnum(Type)
  @ApiProperty()
  type: Type;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  deadline: string;

  @IsEnum(Status)
  @ApiProperty()
  status: Status;
}
