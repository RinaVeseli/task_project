import { UnprocessableEntityException } from '@nestjs/common';
import { BaseCustomRepository } from 'src/common/db/customBaseRepository/BaseCustomRepository';
import { CustomRepository } from 'src/common/db/decorators/CustomRepository.decorator';
import { CreateReportDTO } from '../dtos/create_report.dto';
import { UpdateReportDTO } from '../dtos/update_report.dto';
import { Reports } from '../entities/report.entity';
import { IReportRepository } from '../interface/reports.repository.interface';
@CustomRepository(Reports)
export class ReportRepository
  extends BaseCustomRepository<Reports>
  implements IReportRepository
{
  async createReport(createReportDto: CreateReportDTO): Promise<Reports> {
    return await this.save(this.create(createReportDto));
  }

  async getReportById(reportId: string): Promise<Reports> {
    const report = await this.findOneBy({ uuid: reportId });
    if (!report) {
      throw new UnprocessableEntityException('Report does not exists');
    }
    return report;
  }
  async getAllReports(): Promise<Reports[]> {
    return await this.find();
  }
  async updateReport(
    reportId: string,
    updateReportDto: UpdateReportDTO,
  ): Promise<Reports> {
    const project = await this.findOneBy({ uuid: reportId });
    await this.update(project.id, updateReportDto);
    return await this.findOneBy({ uuid: reportId });
  }
  async deleteReport(reportId: string): Promise<void> {
    const report = await this.findOneBy({ uuid: reportId });
    await this.remove(report);
  }
}
