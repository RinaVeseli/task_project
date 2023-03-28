import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
  async getReportById(reportId: string): Promise<Reports> {
    const report = await this.findOne({
      where: {
        uuid: reportId,
      },
      relations: ['user', 'projects'],
    });
    if (!report) {
      throw new UnprocessableEntityException('Report does not exists');
    }
    return report;
  }
  async getAllReports(): Promise<Reports[]> {
    try {
      return await this.find();
    } catch (error) {
      throw new InternalServerErrorException('Unable to retrieve reports');
    }
  }

  async deleteReport(reportId: string): Promise<void> {
    const report = await this.findOneBy({ uuid: reportId });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    try {
      await this.remove(report);
    } catch (error) {
      throw new InternalServerErrorException('Unable to delete report');
    }
  }
}
