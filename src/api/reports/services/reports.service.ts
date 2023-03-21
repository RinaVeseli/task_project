import { Injectable } from '@nestjs/common';
import { CreateReportDTO } from '../dtos/create_report.dto';
import { UpdateReportDTO } from '../dtos/update_report.dto';
import { Reports } from '../entities/report.entity';
import { ReportRepository } from '../repository/report.repository';

@Injectable()
export class ReportsService {
  constructor(private readonly reportRepository: ReportRepository) {}
  async createReport(createReportDto: CreateReportDTO): Promise<Reports> {
    return await this.reportRepository.createReport(createReportDto);
  }

  async getAll(): Promise<Reports[]> {
    return await this.reportRepository.getAllReports();
  }
  async getById(reportId: string): Promise<Reports> {
    return await this.reportRepository.getReportById(reportId);
  }
  async deleteReport(reportId: string): Promise<void> {
    await this.reportRepository.deleteReport(reportId);
  }
  async updateReport(
    reportId: string,
    updateReportDto: UpdateReportDTO,
  ): Promise<Reports> {
    return await this.reportRepository.updateReport(reportId, updateReportDto);
  }
}
