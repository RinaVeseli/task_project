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
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRoles } from '../user/enums/roles.enum';
import { UserService } from '../user/user.service';
import { AddUsersDto } from './dtos/addUser.dto';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Project } from './entities/project.entity';
import { IProjectController } from './interface/project.controller.interface';
import { ProjectService } from './project.service';

@Controller('project')
@ApiBearerAuth()
@Public()
@ApiTags('Project')
@Injectable()
@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
export class ProjectController implements IProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(): Promise<Project[]> {
    return await this.projectService.findAll();
  }
  @Get(':projectId')
  async findOne(@Param('projectId') projectId: string): Promise<Project> {
    return await this.projectService.findOne(projectId);
  }

  @Roles(UserRoles.ADMIN)
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectService.create(createProjectDto);
  }
  @Patch(':projectId')
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.projectService.update(projectId, updateProjectDto);
  }
  @Delete(':projectId')
  async remove(@Param('projectId') projectId: string): Promise<void> {
    return await this.projectService.remove(projectId);
  }

  @Put(':projectId/users')
  async addUsers(
    @Param('projectId') projectId: string,
    @Body() addUserDto: AddUsersDto,
  ): Promise<Project> {
    return this.projectService.addUsers(projectId, addUserDto);
  }
}
