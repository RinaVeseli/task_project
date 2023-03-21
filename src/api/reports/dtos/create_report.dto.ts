import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsEnum, IsString } from 'class-validator';
import { ReportTYPE } from '../enums/type_file.enum';

export class CreateReportDTO {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  url: string;

  @IsEnum(ReportTYPE)
  @ApiProperty()
  file_type: ReportTYPE;
}
