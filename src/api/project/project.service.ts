import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Project } from './entities/project.entity';
import { IProjectService } from './interface/project.service.interface';
import { ProjectRepository } from './repository/project.repository';

@Injectable()
export class ProjectService implements IProjectService{

    constructor(private projectRepository: ProjectRepository){}
    findOne(projectId: string): Promise<Project> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<Project[]> {
        throw new Error('Method not implemented.');
    }
    update(projectId: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
        throw new Error('Method not implemented.');
    }
    remove(projectId: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        return await this.projectRepository.save(this.projectRepository.create(createProjectDto));
        
    }
}
