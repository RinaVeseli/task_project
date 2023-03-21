import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRoles } from 'src/api/user/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateReportDTO } from '../dtos/create_report.dto';
import { UpdateReportDTO } from '../dtos/update_report.dto';
import { Reports } from '../entities/report.entity';
import { ReportsService } from '../services/reports.service';

@Controller('reports')
@ApiBearerAuth()
@Public()
@ApiTags('reports')
@Injectable()
export class ReportsController {
  constructor(private readonly reportService: ReportsService) {}
  @Get()
  async getAllReports(): Promise<Reports[]> {
    return await this.reportService.getAll();
  }
  @Get(':reportId')
  async getReportById(@Param('reportId') reportId: string): Promise<Reports> {
    return await this.reportService.getById(reportId);
  }
  @Post()
  async createReport(
    @Body() createReportDto: CreateReportDTO,
  ): Promise<Reports> {
    return await this.reportService.createReport(createReportDto);
  }

  @Patch(':reportId')
  async updateReport(
    @Param('reportId') reportId: string,
    @Body() updateReportDto: UpdateReportDTO,
  ): Promise<Reports> {
    return await this.reportService.updateReport(reportId, updateReportDto);
  }
  @Delete(':reportId')
  async remove(@Param('reportId') reportId: string): Promise<void> {
    return await this.reportService.deleteReport(reportId);
  }
}
