import { UnprocessableEntityException } from '@nestjs/common';
import { BaseCustomRepository } from 'src/common/db/customBaseRepository/BaseCustomRepository';
import { CustomRepository } from 'src/common/db/decorators/CustomRepository.decorator';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../entities/task.entity';
import { ITaskRepository } from '../interface/task.repository.interface';

@CustomRepository(Task)
export class TaskRepository
  extends BaseCustomRepository<Task>
  implements ITaskRepository
{
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.save(this.create(createTaskDto));
  }
  async getTaskById(taskId: string): Promise<Task> {
    const task = await this.findOne({
      where: {
        uuid: taskId,
      },
      relations: ['users', 'projects'],
    });
    if (!task) {
      throw new UnprocessableEntityException('This task does not exist!');
    }
    return task;
  }
  async getTasks(): Promise<Task[]> {
    return await this.find();
  }
  async updateTask(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.getTaskById(taskId);
    await this.update(task.id, updateTaskDto);
    return await this.getTaskById(taskId);
  }
  async removeTask(taskId: string): Promise<void> {
    const task = await this.findOneBy({ uuid: taskId });
    if (!task) {
      throw new UnprocessableEntityException('This task does not exist!');
    }
    await this.remove(task);
  }
}
