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

export class CreateTaskDto {
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
