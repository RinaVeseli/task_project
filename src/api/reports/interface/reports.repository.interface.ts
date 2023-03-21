import { IBaseCustomRepository } from 'src/common/db/customBaseRepository/interfaces/BaseCustomRepository.interface';
import { CreateReportDTO } from '../dtos/create_report.dto';
import { UpdateReportDTO } from '../dtos/update_report.dto';
import { Reports } from '../entities/report.entity';

export interface IReportRepository extends IBaseCustomRepository<Reports> {
  createReport(createReportDto: CreateReportDTO): Promise<Reports>;

  getReportById(reportId: string): Promise<Reports>;

  getAllReports(): Promise<Reports[]>;

  updateReport(
    reportId: string,
    updateReportDto: UpdateReportDTO,
  ): Promise<Reports>;

  deleteReport(reportId: string): Promise<void>;
}
