import { UnprocessableEntityException } from '@nestjs/common';
import { User } from 'src/api/user/entities/user.entity';
import { BaseCustomRepository } from '../../../common/db/customBaseRepository/BaseCustomRepository';
import { CustomRepository } from '../../../common/db/decorators/CustomRepository.decorator';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { Project } from '../entities/project.entity';
import { IProjectRepository } from '../interface/project.repository.interface';

@CustomRepository(Project)
export class ProjectRepository
  extends BaseCustomRepository<Project>
  implements IProjectRepository
{
  async getProjects(): Promise<Project[]> {
    return await this.find();
  }

  async getProjectById(projectId: string): Promise<Project> {
    const project = await this.findOneBy({ uuid: projectId });
    if (!project) {
      throw new UnprocessableEntityException('This project does not exist!');
    }
    return project;
  }

  async updateProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findOneBy({ uuid: projectId });
    await this.update(project.id, updateProjectDto);
    return await this.findOneBy({ uuid: projectId });
  }

  async addUserToProject(projectId: string, userId: string): Promise<void> {
    const project = await this.getProjectById(projectId);
    const user = await this.manager.findOne(User, { where: { uuid: userId } });

    project.users = [user];
    await this.save(project);
  }
  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.save(this.create(createProjectDto));
  }

  async removeProject(projectId: string): Promise<void> {
    const project = await this.findOneBy({ uuid: projectId });
    await this.remove(project);
  }
}
