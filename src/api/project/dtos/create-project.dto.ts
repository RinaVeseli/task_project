import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/api/user/entities/user.entity';
import { Type } from '../enums/type.enum';

export class CreateProjectDto {
  @IsString()
  @ApiProperty()
  url: string;

  @IsString()
  @ApiProperty()
  name: string;

  @IsEnum(Type)
  @ApiProperty()
  type: Type;

  //   @IsOptional()
  //   users?: User[];
}
