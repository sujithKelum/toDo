import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ToDoCreateDto } from './dtos/to-do-create.dto';
import { ToDoEditDto } from './dtos/to-do-edit.dto';
import { ToDo } from '../../shared/entities/toDo.entity';
import { ToDoRepository } from '../../shared/repositories/toDo.repository';
import { BaseService } from '../../shared/services/base.service';
import { TodoGetDto } from './dtos/to-do-get.dto';
import { _isEmpty, _toBoolean } from '../../shared/helpers/core/core-functions';

@Injectable()
export class ToDoService extends BaseService<ToDo> {
  constructor(
    @InjectRepository(ToDo)
    private readonly repository: ToDoRepository
  ) {
    super(repository);
  }

  async getCustom(
    toDoGetDto: TodoGetDto,
    sortObject: object
  ): Promise<object> {

    const query = this.masterRepository.createQueryBuilder('toDo');
    query.andWhere(
      'toDo.deleted_at IS NULL'
    );

    if (!_isEmpty(toDoGetDto.status)) {
      query.andWhere('toDo.status = :status', {
        status: _toBoolean(toDoGetDto.status)
      });
    }

    if (Object.keys(sortObject).length !== 0) {
      const sortingKeys = Object.keys(sortObject);
      sortingKeys.forEach((value, index) => {
        query.addOrderBy(`toDo.${sortingKeys[index]}`, sortObject[value]);
      });
    }

    const items = await query.getMany();

    if (items !== undefined) {
      return {
        data: items
      };
    } else {
      return {
        data: []
      };
    }
  }

  async create(toDoCreateDto: ToDoCreateDto): Promise<object> {
    return {
      data: { ...(await this.repository.createToDo(toDoCreateDto)) },
      meta: {
        message: 'success'
      }
    };
  }

  async update(toDoEditDto: ToDoEditDto, id: string): Promise<object> {
    const toDoToUpdate = await this.repository.findOne(id);
    if (!toDoToUpdate) {
      throw new NotFoundException();
    }
    return {
      data: {
        ...(await this.repository.updateToDo(
          toDoEditDto,
          toDoToUpdate
        ))
      },
      meta: {
        message: 'success'
      }
    };
  }

  async delete(id: string): Promise<void> {
    const toDoItem = await this.repository.findOne(id);

    if (!toDoItem) {
      throw new NotFoundException();
    }

    await this.repository.deleteElement(toDoItem);
  }

}
