import { IBaseCustomRepository } from 'src/common/db/customBaseRepository/interfaces/BaseCustomRepository.interface';
import { CreateReportDTO } from '../dtos/create_report.dto';
import { UpdateReportDTO } from '../dtos/update_report.dto';
import { Reports } from '../entities/report.entity';

export interface IReportRepository extends IBaseCustomRepository<Reports> {
  getReportById(reportId: string): Promise<Reports>;

  getAllReports(): Promise<Reports[]>;

  deleteReport(reportId: string): Promise<void>;
}
