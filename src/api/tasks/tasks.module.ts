import { Module } from '@nestjs/common';
import { CustomRepositoryModule } from 'src/common/db/CustomRepository.module';
import { ProjectModule } from '../project/project.module';
import { UserModule } from '../user/user.module';
import { TasksController } from './controller/tasks.controller';
import { TaskRepository } from './repository/task.repository';
import { TaskService } from './services/task.service';

@Module({
  imports: [
    CustomRepositoryModule.forCustomRepository([TaskRepository]),
    UserModule,
    ProjectModule,
  ],
  controllers: [TasksController],
  providers: [TaskService],
})
export class TasksModule {}
