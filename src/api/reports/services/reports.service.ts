import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProjectService } from 'src/api/project/project.service';
import { UserService } from 'src/api/user/user.service';
import { CreateReportDTO } from '../dtos/create_report.dto';
import { UpdateReportDTO } from '../dtos/update_report.dto';
import { Reports } from '../entities/report.entity';
import { ReportRepository } from '../repository/report.repository';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';
@Injectable()
export class ReportsService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  async createReportWithUser(
    userId: string,
    createReportDto: CreateReportDTO,
  ): Promise<Reports> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const report = new Reports();
    report.name = createReportDto.name;
    report.url = createReportDto.url;
    report.file_type = createReportDto.file_type;

    if (createReportDto.projectId) {
      const project = await this.projectService.findOne(
        createReportDto.projectId,
      );
      if (!project) {
        throw new NotFoundException(
          `Project with ID ${createReportDto.projectId} not found`,
        );
      }
      report.projects = project;
    }

    report.user = user;

    return this.reportRepository.save(report);
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
    const report = await this.reportRepository.findOne({
      where: {
        uuid: reportId,
      },
      relations: ['projects'],
    });

    if (!report) {
      throw new NotFoundException(`Report with ID ${reportId} not found`);
    }

    report.name = updateReportDto.name || report.name;
    report.url = updateReportDto.url || report.url;
    report.file_type = updateReportDto.file_type || report.file_type;

    if (updateReportDto.projectId) {
      const project = await this.projectService.findOne(
        updateReportDto.projectId,
      );
      if (!project) {
        throw new NotFoundException(
          `Project with ID ${updateReportDto.projectId} not found`,
        );
      }
      report.projects = project;
    }

    return this.reportRepository.save(report);
  }

  async generateFile(report: Reports, response: Response): Promise<void> {
    if (report.file_type === 'pdf') {
      return this.generatePDF(report, response);
    } else if (report.file_type === 'excel') {
      return this.generateExcel(report, response);
    } else {
      throw new BadRequestException('Invalid report type');
    }
  }

  async generatePDF(report: Reports, response: Response): Promise<void> {
    const doc = new PDFDocument();
    doc.pipe(response);

    doc.fontSize(18).text(`Report ID: ${report.id}`);
    doc.fontSize(12).text(`Name: ${report.name}`);
    doc.fontSize(12).text(`Url: ${report.url}`);

    doc.end();
  }
  async generateExcel(report: Reports, response: Response): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');

    worksheet.addRow(['Report ID', 'Name', 'URL']);

    worksheet.addRow([report.id, report.name, report.url]);

    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 25;
    worksheet.getColumn(3).width = 50;

    response.setHeader(
      'Content-Disposition',
      'attachment; filename="report.xlsx"',
    );
    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    await workbook.xlsx.write(response);
    response.end();
  }
}
