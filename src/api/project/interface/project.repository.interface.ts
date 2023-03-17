/* eslint-disable @typescript-eslint/no-empty-interface */
import { IBaseCustomRepository } from 'src/common/db/customBaseRepository/interfaces/BaseCustomRepository.interface';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { UpdateProjectDto } from '../dtos/update-project.dto';
import { Project } from '../entities/project.entity';

export interface IProjectRepository extends IBaseCustomRepository<Project> {
  createProject(createProjectDto: CreateProjectDto): Promise<Project>;

  getProjectById(projectId: string): Promise<Project>;

  getProjects(): Promise<Project[]>;

  updateProject(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project>;

  removeProject(projectId: string): Promise<void>;
}
