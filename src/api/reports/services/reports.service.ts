import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ProjectService } from 'src/api/project/project.service';
import { UserRepository } from 'src/api/user/repository/user.repository';
import { UserService } from 'src/api/user/user.service';
import { CreateReportDTO } from '../dtos/create_report.dto';
import { UpdateReportDTO } from '../dtos/update_report.dto';
import { Reports } from '../entities/report.entity';
import { ReportRepository } from '../repository/report.repository';

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}
  async createReport(createReportDto: CreateReportDTO): Promise<Reports> {
    return await this.reportRepository.createReport(createReportDto);
  }
  async createReportWithUser(
    userId: string,
    createReportDto: CreateReportDTO,
  ): Promise<Reports> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new UnprocessableEntityException('User not found');
    }

    const report = new Reports();
    report.name = createReportDto.name;
    report.file_type = createReportDto.file_type;
    report.url = createReportDto.url;
    report.user = user;
    return this.reportRepository.save(report);
  }

  async addUserToReport(reportId: string, userId: string): Promise<Reports> {
    const user = await this.userService.findOne(userId);
    const report = await this.reportRepository.findOne({
      where: {
        uuid: reportId,
      },
      relations: ['user'],
    });
    report.user = user;

    await this.reportRepository.save(report);

    return report;
  }
  async addProjectToReport(
    reportId: string,
    projectId: string,
  ): Promise<Reports> {
    const project = await this.projectService.findOne(projectId);
    const report = await this.reportRepository.findOne({
      where: {
        uuid: reportId,
      },
      relations: ['projects'],
    });
    report.projects = project;

    await this.reportRepository.save(report);

    return report;
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
