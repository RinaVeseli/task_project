import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsEnum, IsString } from 'class-validator';
import { Reports } from '../entities/report.entity';
import { ReportTYPE } from '../enums/type_file.enum';

export class CreateReportDTO implements Partial<Reports> {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  url: string;

  @IsEnum(ReportTYPE)
  @ApiProperty()
  file_type: ReportTYPE;

  @IsString()
  @ApiProperty()
  projectId?: string;
}
