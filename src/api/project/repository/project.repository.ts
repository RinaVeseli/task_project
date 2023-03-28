import {
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    try {
      return await this.find();
    } catch (error) {
      throw new InternalServerErrorException('Unable to retrieve projects');
    }
  }

  async getProjectById(projectId: string): Promise<Project> {
    const project = await this.findOne({
      where: {
        uuid: projectId,
      },
      relations: ['users'],
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      return await this.save(this.create(createProjectDto));
    } catch (error) {
      throw new InternalServerErrorException('Unable to create project');
    }
  }

  async removeProject(projectId: string): Promise<void> {
    const project = await this.findOneBy({ uuid: projectId });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    try {
      await this.remove(project);
    } catch (error) {
      throw new InternalServerErrorException('Unable to delete project');
    }
  }

  async addUserToProject(projectId: string, userId: string): Promise<void> {
    const project = await this.getProjectById(projectId);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const user = await this.manager.findOne(User, { where: { uuid: userId } });

    project.users = [user];
    await this.save(project);
  }
}
