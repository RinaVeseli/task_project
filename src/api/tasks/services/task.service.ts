import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProjectService } from 'src/api/project/project.service';
import { UserService } from 'src/api/user/user.service';
import { AddUsersDto } from '../dtos/adduser.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../entities/task.entity';
import { ITaskService } from '../interface/task.service.interface';
import { TaskRepository } from '../repository/task.repository';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    private taskRepository: TaskRepository,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
  ) {}

  async create(createReportDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.type = createReportDto.type;
    task.name = createReportDto.name;
    task.description = createReportDto.description;
    task.deadline = createReportDto.deadline;
    task.status = createReportDto.status;

    if (createReportDto.projectId) {
      const project = await this.projectService.findOne(
        createReportDto.projectId,
      );
      if (!project) {
        throw new NotFoundException(
          `Project with ID ${createReportDto.projectId} not found`,
        );
      }
      task.projects = project;
    }

    return this.taskRepository.createTask(task);
  }

  async findOne(taskId: string): Promise<Task> {
    return await this.taskRepository.getTaskById(taskId);
  }
  async findAll(): Promise<Task[]> {
    return await this.taskRepository.getTasks();
  }

  async update(id: string, updateReportDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ uuid: id });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    task.type = updateReportDto.type ?? task.type;
    task.name = updateReportDto.name ?? task.name;
    task.description = updateReportDto.description ?? task.description;
    task.deadline = updateReportDto.deadline ?? task.deadline;
    task.status = updateReportDto.status ?? task.status;

    if (updateReportDto.projectId) {
      const project = await this.projectService.findOne(
        updateReportDto.projectId,
      );
      if (!project) {
        throw new NotFoundException(
          `Project with ID ${updateReportDto.projectId} not found`,
        );
      }
      task.projects = project;
    } else {
      task.projects = task.projects;
    }

    return this.taskRepository.save(task);
  }

  async remove(taskId: string): Promise<void> {
    await this.taskRepository.removeTask(taskId);
  }
  async addUsers(taskId: string, addUserDto: AddUsersDto): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: {
        uuid: taskId,
      },
      relations: ['users'],
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    const users = await this.userService.findUsersByIds(addUserDto.userIds);
    if (!users || users.length === 0) {
      throw new BadRequestException('User IDs not found');
    }
    task.users = task.users || [];
    users.forEach((user) => {
      if (!task.users.some((u) => u.id === user.id)) {
        task.users.push(user);
      }
    });
    return this.taskRepository.save(task);
  }
}
