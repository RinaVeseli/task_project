import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { Project } from 'src/api/project/entities/project.entity';
import { JoinTable, ManyToMany } from 'typeorm';
import { IsUnique } from '../../../common/decorators/validation.decorator';
import { User } from '../entities/user.entity';
import { UserRoles } from '../enums/roles.enum';
import { UserGender } from '../enums/userGender.enum';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsString()
  @ApiProperty()
  middle_name: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @Validate(IsUnique, [User])
  @ApiProperty()
  email: string;

  @IsString()
  @Validate(IsUnique, [User])
  @ApiProperty()
  username: string;

  @IsEnum(UserGender)
  @ApiProperty()
  gender: UserGender;

  @IsString()
  @IsOptional()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  timezone: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isVerified: boolean;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  birthdate: Date;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  status: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  avatar: string;

  @IsEnum(UserRoles)
  @ApiProperty()
  role: number;
}
