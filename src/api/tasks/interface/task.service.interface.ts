import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../entities/task.entity';

export interface ITaskService {
  create(createTaskDto: CreateTaskDto): Promise<Task>;

  findOne(taskId: string): Promise<Task>;

  findAll(): Promise<Task[]>;

  update(taskId: string, updateTaskDto: UpdateTaskDto): Promise<Task>;

  remove(taskId: string): Promise<void>;
}
