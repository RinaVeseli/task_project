import { CreateProjectDto } from "../dtos/create-project.dto";
import { Project } from "../entities/project.entity";

export interface IProjecController{
    create(createProjectDto: CreateProjectDto): Promise<Project>;

    findOne(projectId: string): Promise<Project>;

    findAll(): Promise<Project[]>;

    updateProject(projectId: string): Promise<Project>;

    remove(projectId: string): Promise<void>;
}