import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomRepositoryModule } from 'src/common/db/CustomRepository.module';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './repository/project.repository';
import { ProjectService } from './project.service';
import { UserRepository } from '../user/repository/user.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([ProjectRepository]),
    UserModule,
  ],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
