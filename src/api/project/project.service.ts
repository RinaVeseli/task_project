import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AddUsersDto } from './dtos/addUser.dto';
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

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = await this.projectRepository.createProject(
      createProjectDto,
    );
    const users = await this.userService.findUsersByIds(
      createProjectDto.userId,
    );
    if (!users || users.length === 0) {
      throw new BadRequestException('User IDs cannot be empty');
    }
    project.users = users;
    return this.projectRepository.save(project);
  }
  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: {
        uuid: id,
      },
      relations: ['users'],
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    if (updateProjectDto.name) {
      project.name = updateProjectDto.name;
    }
    if (updateProjectDto.type) {
      project.type = updateProjectDto.type;
    }
    if (updateProjectDto.userId) {
      const users = await this.userService.findUsersByIds(
        updateProjectDto.userId,
      );
      if (!users || users.length === 0) {
        throw new BadRequestException('User IDs cannot be empty');
      }
      project.users = users;
    }

    return this.projectRepository.save(project);
  }
  async addUsers(projectId: string, addUserDto: AddUsersDto): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: {
        uuid: projectId,
      },
      relations: ['users'],
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const users = await this.userService.findUsersByIds(addUserDto.userIds);
    if (!users || users.length === 0) {
      throw new BadRequestException('User IDs not found');
    }
    project.users = project.users || [];
    users.forEach((user) => {
      if (!project.users.some((u) => u.id === user.id)) {
        project.users.push(user);
      }
    });
    return this.projectRepository.save(project);
  }
  async remove(projectId: string): Promise<void> {
    await this.projectRepository.removeProject(projectId);
  }
}
