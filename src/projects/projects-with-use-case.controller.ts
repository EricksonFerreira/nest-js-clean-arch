import { StartProjectUseCase } from "./use-cases/start-project.use-case";
import { FindAllProjectsUseCase } from "./use-cases/find-all-projects.use-case";
import { CreateProjectUseCase } from "./use-cases/create-project.use-case";
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { StartProjectDto } from "./dto/start-projet.dto";

@Controller("projects")
export class ProjectsWithUseCaseController {
  @Inject(CreateProjectUseCase)
  private readonly createProjectUseCase: CreateProjectUseCase;
  @Inject(FindAllProjectsUseCase)
  private readonly findAllProjectsUseCase: FindAllProjectsUseCase;
  @Inject(StartProjectUseCase)
  private readonly startProjectUseCase: StartProjectUseCase;
  // constructor(
  //   private readonly createProjectUseCase: CreateProjectUseCase,
  //   private readonly findAllProjectsUseCase: FindAllProjectsUseCase,
  //   private readonly startProjectUseCase: StartProjectUseCase,
  // ) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.createProjectUseCase.execute(createProjectDto);
  }

  @Get()
  findAll() {
    return this.findAllProjectsUseCase.execute();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() startProjectDto: StartProjectDto) {
    return this.startProjectUseCase.execute(id, startProjectDto);
  }
}
