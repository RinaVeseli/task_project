import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from 'src/common/db/CustomRepository.module';
import { UserRepository } from '../user/repository/user.repository';
import { ReportsController } from './controller/reports.controller';
import { ReportRepository } from './repository/report.repository';
import { ReportsService } from './services/reports.service';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([
      ReportRepository,
      UserRepository,
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
