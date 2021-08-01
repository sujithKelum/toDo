import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class MasterFilterDto {
  @ApiProperty({
    description: 'Page number',
    required: false,
    type: Number
  })
  readonly page: number;

  @ApiProperty({
    description: 'Number of records returned in a page ',
    required: false,
    type: Number
  })
  readonly page_size: number;

  @ApiProperty({
    description: 'Ex: age|asc,name|desc',
    required: false,
    type: String
  })
  @IsOptional()
  sort_by: string;
}
