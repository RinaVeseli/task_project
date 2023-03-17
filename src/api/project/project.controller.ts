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
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRoles } from '../user/enums/roles.enum';
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
  @Roles(UserRoles.ADMIN)
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return await this.projectService.create(createProjectDto);
  }
  @Get(':projectId')
  async findOne(@Param('projectId') projectId: string): Promise<Project> {
    return await this.projectService.findOne(projectId);
  }
  @Get()
  async findAll(): Promise<Project[]> {
    return await this.projectService.findAll();
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

  // @Get()

  // async getUsers(){
  //     return 'Hi user';
  // }
}
