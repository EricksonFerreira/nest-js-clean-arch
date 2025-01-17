import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects/entities/project.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ProjectsModule, 
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities:["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    })
  ],
})
export class AppModule {}
