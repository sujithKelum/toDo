import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SortByDto {
  @ApiProperty({
    description: 'Ex: age|asc,name|desc',
    required: false,
    type: String
  })
  @IsOptional()
  sort_by: string;
}
