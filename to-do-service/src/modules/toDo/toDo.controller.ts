
import { Body, Controller, Get, Param, Patch, Post, Query, Delete } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiCreatedResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { ToDoService } from './toDo.service';
import { ToDoCreateDto } from './dtos/to-do-create.dto';
import { ToDoEditDto } from './dtos/to-do-edit.dto';
import { _SortObject } from '../../shared/decorators/sort-object.decorator';
import {
  SingleResponse,
  MultipleResponse
} from './swagger-models/to-do-response.model';
import { TodoGetDto } from './dtos/to-do-get.dto';
import { InputTrimPipe } from '../../shared/pipes/input-trim.pipe';

@ApiTags('ToDo')
@Controller('api/toDo')
export class ToDoController {
  constructor(private readonly service: ToDoService) { }

  @Get()
  @ApiOkResponse({ type: MultipleResponse })
  get(
    @Query(InputTrimPipe) toDoGetDto: TodoGetDto,
    @_SortObject() sortObject: object
  ): Promise<object> {
    return this.service.getCustom(toDoGetDto, {
      ...sortObject
    });
  }

  @Get('/:id')
  @ApiOkResponse({ type: SingleResponse })
  getElementById(@Param('id') id: string): Promise<object> {
    return this.service.getById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: SingleResponse })
  createElement(
    @Body(InputTrimPipe) toDoCreateDto: ToDoCreateDto
  ): Promise<object> {
    return this.service.create(toDoCreateDto);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: SingleResponse })
  patchElement(
    @Body(InputTrimPipe) toDoEditDto: ToDoEditDto,
    @Param('id') id: string
  ): Promise<object> {
    return this.service.update(toDoEditDto, id);
  }

  @Delete('/:id')
  @ApiNoContentResponse()
  delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }

}
