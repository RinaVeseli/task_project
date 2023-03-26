import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Project } from './entities/project.entity';
import { IProjectService } from './interface/project.service.interface';
import { ProjectRepository } from './repository/project.repository';

@Injectable()
export class ProjectService implements IProjectService {
  constructor(
    private projectRepository: ProjectRepository,
    private readonly userService: UserService,
  ) {}

  async findOne(projectId: string): Promise<Project> {
    return await this.projectRepository.getProjectById(projectId);
  }
  async findAll(): Promise<Project[]> {
    return await this.projectRepository.getProjects();
  }
  async update(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.projectRepository.updateProject(
      projectId,
      updateProjectDto,
    );
  }

  async remove(projectId: string): Promise<void> {
    await this.projectRepository.removeProject(projectId);
  }
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectRepository.createProject(createProjectDto);
  }
  async assignUsersToProject(
    projectId: string,
    userId: string[],
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: {
        uuid: projectId,
      },
      relations: ['users'],
    });
    if (!userId || userId.length === 0) {
      return project;
    }
    const users = await this.userService.findUsersByIds(userId);
    project.users = [...project.users, ...users];
    await this.projectRepository.createProject(project);
    return project;
  }
}
