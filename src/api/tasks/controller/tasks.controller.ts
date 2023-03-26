import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../entities/task.entity';
import { ITaskController } from '../interface/task.controller.interface';
import { ServicesService } from '../services/services.service';

@Controller('tasks')
@ApiBearerAuth()
@ApiTags('Tasks')
@Injectable()
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
export class TasksController implements ITaskController {
  constructor(private readonly taskService: ServicesService) {}
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskService.create(createTaskDto);
  }
  @Get(':taskId')
  async findOne(@Param('taskId') taskId: string): Promise<Task> {
    return await this.taskService.findOne(taskId);
  }
  @Get()
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Patch(':taskId')
  async updateProject(
    @Param('taskId')
    taskId: string,
    @Body()
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.taskService.update(taskId, updateTaskDto);
  }
  @Delete(':taskId')
  async remove(@Param('taskId') taskId: string): Promise<void> {
    return await this.taskService.remove(taskId);
  }
  @Post('/:taskId/:userId')
  addUserToTask(
    @Param('taskId') taskId: string,
    @Param('userId') userId: string,
  ) {
    return this.taskService.addUserToTask(taskId, userId);
  }

  @Post('/add/:taskId/:projecId')
  addProjectToTask(
    @Param('taskId') taskId: string,
    @Param('projecId') projectId: string,
  ) {
    return this.taskService.addProjectToTask(taskId, projectId);
  }
}
