import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SortByDto } from '../../../shared/dtos/sort-by.dto';
import { _IsBooleanCustom } from '../../../shared/decorators/boolean.decorator';

export class TodoGetDto extends SortByDto {

  @ApiProperty({
    description: 'Name',
    required: false,
    type: String
  })
  @IsOptional()
  readonly name: string;

  @ApiProperty({
    description: 'Complete',
    required: false,
    type: Boolean
  })
  @IsOptional()
  @_IsBooleanCustom()
  readonly complete: string;

  @ApiProperty({
    description: 'Status',
    required: false,
    type: Boolean
  })
  @IsOptional()
  @_IsBooleanCustom()
  readonly status: string;

  @ApiProperty({
    description: 'End Date',
    required: false,
    type: Date
  })
  @IsOptional()
  readonly end_date: Date;
  
}
