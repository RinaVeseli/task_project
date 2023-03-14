import { BaseCustomRepository } from '../../../common/db/customBaseRepository/BaseCustomRepository';
import { CustomRepository } from '../../../common/db/decorators/CustomRepository.decorator';
import { Project } from '../entities/project.entity';
import { IProjectRepository } from '../interface/project.repository.interface';

@CustomRepository(Project)
export class ProjectRepository
  extends BaseCustomRepository<Project>
  implements IProjectRepository {}
