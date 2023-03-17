import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomRepositoryModule } from 'src/common/db/CustomRepository.module';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './repository/project.repository';
import { ProjectService } from './project.service';

@Module({
    imports:[
        CustomRepositoryModule.forCustomRepository([ProjectRepository])
    ],
    controllers: [ProjectController],
  providers: [ProjectService],
})

export class ProjectModule {
}
