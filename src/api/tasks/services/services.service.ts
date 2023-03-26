import { Injectable } from '@nestjs/common';
import { ProjectService } from 'src/api/project/project.service';
import { UserService } from 'src/api/user/user.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../entities/task.entity';
import { ITaskService } from '../interface/task.service.interface';
import { TaskRepository } from '../repository/task.repository';

@Injectable()
export class ServicesService implements ITaskService {
  constructor(
    private taskRepository: TaskRepository,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.createTask(createTaskDto);
  }
  async findOne(taskId: string): Promise<Task> {
    return await this.taskRepository.getTaskById(taskId);
  }
  async findAll(): Promise<Task[]> {
    return await this.taskRepository.getTasks();
  }
  async update(taskId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.taskRepository.updateTask(taskId, updateTaskDto);
  }
  async remove(taskId: string): Promise<void> {
    await this.taskRepository.removeTask(taskId);
  }
  async addUserToTask(taskId: string, userId: string): Promise<Task> {
    const user = await this.userService.findOne(userId);
    const report = await this.taskRepository.findOne({
      where: {
        uuid: taskId,
      },
      relations: ['user'],
    });
    report.user = user;

    await this.taskRepository.save(report);

    return report;
  }
  async addProjectToTask(taskId: string, projectId: string): Promise<Task> {
    const project = await this.projectService.findOne(projectId);
    const report = await this.taskRepository.findOne({
      where: {
        uuid: taskId,
      },
      relations: ['projects'],
    });
    report.projects = project;

    await this.taskRepository.save(report);

    return report;
  }
}
