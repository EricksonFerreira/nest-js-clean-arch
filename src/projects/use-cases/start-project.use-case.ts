import { Inject, Injectable } from "@nestjs/common";
import { Project } from "../entities/project.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { StartProjectDto } from "../dto/start-projet.dto";
import { IProjectRepository } from "../project.repository";

@Injectable()
export class StartProjectUseCase {
  constructor(
    @Inject("IProjectRepository")
    private readonly projectRepo: IProjectRepository,
  ) {}

  async execute(id: string, input: StartProjectDto) {
    const project = await this.projectRepo.findById(id);
    project.start(input.started_at);
    await this.projectRepo.update(project);
    return project;
  }
}
