import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectRepository } from './repository/project.repository';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const repository={};
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        
        ProjectService,
        {
        provide: getRepositoryToken(ProjectRepository),
        useValue: repository,
        }
    
    ],

    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
