import { IBaseCustomRepository } from 'src/common/db/customBaseRepository/interfaces/BaseCustomRepository.interface';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../entities/task.entity';

export interface ITaskRepository extends IBaseCustomRepository<Task> {
  createTask(createTaskDto: CreateTaskDto): Promise<Task>;

  getTaskById(taskId: string): Promise<Task>;

  getTasks(): Promise<Task[]>;

  updateTask(taskId: string, updateTaskDto: UpdateTaskDto): Promise<Task>;

  removeTask(taskId: string): Promise<void>;
}
