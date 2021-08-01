import { Module } from '@nestjs/common';
import { ToDoController } from './toDo.controller';
import { ToDoService } from './toDo.service';
import { ToDoRepository } from '../../shared/repositories/toDo.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoRepository])],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ElementsModule {}
