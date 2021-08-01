import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { _IsBooleanCustom } from '../decorators/boolean.decorator';
import { SortByDto } from './sort-by.dto';

export class GetDto extends SortByDto {
  @ApiProperty({
    description: 'Status',
    required: false,
    type: Boolean
  })
  @IsOptional()
  @_IsBooleanCustom()
  readonly status: string;
}
