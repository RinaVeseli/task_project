import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from 'src/common/db/CustomRepository.module';
import { ProjectModule } from '../project/project.module';
import { ProjectRepository } from '../project/repository/project.repository';
import { UserRepository } from '../user/repository/user.repository';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { ReportsController } from './controller/reports.controller';
import { ReportRepository } from './repository/report.repository';
import { ReportsService } from './services/reports.service';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([
      ReportRepository,
      ProjectRepository,
    ]),
    UserModule,
    ProjectModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
