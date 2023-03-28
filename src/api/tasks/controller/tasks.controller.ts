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
import { AddUsersDto } from '../dtos/adduser.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../entities/task.entity';
import { ITaskController } from '../interface/task.controller.interface';
import { ServicesService } from '../services/services.service';

@Controller('Tasks')
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
  @Post(':taskId/users')
  async addUsers(
    @Param('taskId') taskId: string,
    @Body() addUserDto: AddUsersDto,
  ): Promise<Task> {
    return this.taskService.addUsers(taskId, addUserDto);
  }
}
