import { EntityRepository, Repository } from 'typeorm';
import { ToDoCreateDto } from '../../modules/toDo/dtos/to-do-create.dto';
import { ToDoEditDto } from '../../modules/toDo/dtos/to-do-edit.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { ToDo } from '../entities/toDo.entity';
import { _isEmpty, _toBoolean } from '../helpers/core/core-functions';

@EntityRepository(ToDo)
export class ToDoRepository extends Repository<ToDo> {

  async createToDo(toDoCreateDto: ToDoCreateDto): Promise<ToDo> {
    const newToDo = this.create();

    try {
      newToDo.created_at = new Date();
      return await Object.assign(newToDo, toDoCreateDto).save();
    } catch (error) {

      throw new InternalServerErrorException({

      });
    }
  }

  async updateToDo(
    toDoEditDto: ToDoEditDto,
    toDoToUpdate: ToDo
  ): Promise<ToDo> {
    try {
      toDoToUpdate.updated_at = new Date();
      return await Object.assign(toDoToUpdate, toDoEditDto).save();
    } catch (error) {
      throw new InternalServerErrorException({

      });
    }
  }

  async deleteElement(todo: ToDo): Promise<ToDo> {
    try {
      todo.deleted_at = new Date();
      return await todo.save();
    } catch (error) {
      throw new InternalServerErrorException({

      });
    }
  }

}
