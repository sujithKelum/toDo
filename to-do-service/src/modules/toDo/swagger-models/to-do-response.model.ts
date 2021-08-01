import {
  MasterErrorResponse, 
} from '../../../shared/swagger-models/response.model';
import { ApiProperty } from '@nestjs/swagger';
import { ToDoObject } from './to-do-object.model';

export class MultipleResponse {
  @ApiProperty({
    description: 'Data response',
    required: false,
    type: [ToDoObject]
  })
  readonly data: [];

  @ApiProperty({
    description: 'Error response',
    required: false,
    type: MasterErrorResponse
  })
  readonly errors: object;
}

export class SingleResponse {
  @ApiProperty({
    description: 'Data response',
    required: false,
    type: ToDoObject
  })
  readonly data: object;

  @ApiProperty({
    description: 'Error response',
    required: false,
    type: MasterErrorResponse
  })
  readonly errors: object;
}

