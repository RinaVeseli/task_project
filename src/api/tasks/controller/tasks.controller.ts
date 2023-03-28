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
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRoles } from 'src/api/user/enums/roles.enum';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AddUsersDto } from '../dtos/adduser.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../entities/task.entity';
import { ITaskController } from '../interface/task.controller.interface';
import { TaskService } from '../services/task.service';

@Controller('Tasks')
@ApiBearerAuth()
@ApiTags('Tasks')
@Injectable()
@UseGuards(RolesGuard)
export class TasksController implements ITaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskService.create(createTaskDto);
  }

  @Roles(UserRoles.ADMIN)
  @Get(':taskId')
  async findOne(@Param('taskId') taskId: string): Promise<Task> {
    return await this.taskService.findOne(taskId);
  }

  @Public()
  @Get()
  async findAll(): Promise<Task[]> {
    return await this.taskService.findAll();
  }

  @Roles(UserRoles.ADMIN)
  @Patch(':taskId')
  async updateProject(
    @Param('taskId')
    taskId: string,
    @Body()
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.taskService.update(taskId, updateTaskDto);
  }

  @Roles(UserRoles.ADMIN)
  @Delete(':taskId')
  async remove(@Param('taskId') taskId: string): Promise<void> {
    return await this.taskService.remove(taskId);
  }

  @Roles(UserRoles.ADMIN)
  @Post(':taskId/users')
  async addUsers(
    @Param('taskId') taskId: string,
    @Body() addUserDto: AddUsersDto,
  ): Promise<Task> {
    return this.taskService.addUsers(taskId, addUserDto);
  }
}
