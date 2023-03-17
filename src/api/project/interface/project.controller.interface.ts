import { CreateProjectDto } from "../dtos/create-project.dto";
import { UpdateProjectDto } from "../dtos/update-project.dto";
import { Project } from "../entities/project.entity";

export interface IProjectController{
    create(createProjectDto: CreateProjectDto): Promise<Project>;

    findOne(projectId: string): Promise<Project>;

    findAll(): Promise<Project[]>;

    updateProject(projectId: string, updateProjectDto: UpdateProjectDto): Promise<Project>;

    remove(projectId: string): Promise<void>;
}