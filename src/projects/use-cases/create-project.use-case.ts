import { Inject, Injectable } from '@nestjs/common';
import { Project, ProjectStatus } from '../entities/project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IProjectRepository } from '../project.repository';

@Injectable()
export class CreateProjectUseCase {
    constructor(
        @Inject('IProjectRepository')
        private readonly projectRepo: IProjectRepository
    ) {}

    async execute(input: CreateProjectDto) {
        const project = new Project(input);
        await this.projectRepo.create(project);
        return project;
    }
}