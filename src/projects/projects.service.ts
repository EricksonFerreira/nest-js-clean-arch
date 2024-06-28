import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project, ProjectStatus } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ){}

  create(createProjectDto: CreateProjectDto) {
    const project = new Project(createProjectDto);

    if ( createProjectDto.started_at ) {
      project.status = ProjectStatus.Activate;
    }
    return this.projectRepo.save(project);
  }

  findAll() {
    return this.projectRepo.find();
  }
  
  findOne(id: string) {
    return this.projectRepo.findOneOrFail({where: {id} });
    // return `This action returns a #${id} project`;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepo.findOneOrFail({where: {id}});

    updateProjectDto.name && (project.name = updateProjectDto.name);
    updateProjectDto.description && (project.description = updateProjectDto.description);

    // Iniciar Projeto
    if(updateProjectDto.started_at){
      if(project.status == ProjectStatus.Activate){
        throw new Error('Cannot start activated project');
      }

      if(project.status == ProjectStatus.Completed){
        throw new Error('Cannot start completed project');
      }
      if(project.status == ProjectStatus.Cancelled){
        throw new Error('Cannot start cancelled project');
      }

      project.started_at = updateProjectDto.started_at;
      project.status = ProjectStatus.Activate;
    }

    // Cancelar Projeto
    if(updateProjectDto.cancelled_at){
      if(project.status == ProjectStatus.Activate){
        throw new Error('Cannot cancel activated project');
      }

      if(project.status == ProjectStatus.Completed){
        throw new Error('Cannot cancel completed project');
      }
      if(project.status == ProjectStatus.Cancelled){
        throw new Error('Cannot cancel cancelled project');
      }

      if( updateProjectDto.cancelled_at < project.started_at){
        throw new Error('Cancelled date cannot be before started date');
      }

      project.cancelled_at = updateProjectDto.cancelled_at;
      project.status = ProjectStatus.Cancelled;
    }

    // Finalizar Projeto
    if(updateProjectDto.finished_at){
      if(project.status == ProjectStatus.Completed){
        throw new Error('Cannot finished completed project');
      }
      if(project.status == ProjectStatus.Cancelled){
        throw new Error('Cannot finished cancelled project');
      }

      if( updateProjectDto.finished_at < project.started_at){
        throw new Error('Cancelled date cannot be before started date');
      }

      project.finished_at = updateProjectDto.finished_at;
      project.status = ProjectStatus.Completed;
    }

    return this.projectRepo.save(project);
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
