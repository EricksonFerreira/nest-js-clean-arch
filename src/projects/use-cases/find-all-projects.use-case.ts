import { Inject, Injectable } from '@nestjs/common';
import { Project } from '../entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProjectRepository } from '../project.repository';

@Injectable()
export class FindAllProjectsUseCase {
    constructor(
        @Inject('IProjectRepository')
        private readonly projectRepo: IProjectRepository
    ) {}

    async execute() {
        return this.projectRepo.findAll();
    }
}