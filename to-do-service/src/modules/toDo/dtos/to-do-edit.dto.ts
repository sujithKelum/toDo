import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';

export class ToDoEditDto {
  @ApiProperty({
    description: 'Name',
    required: true,
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
  readonly complete: boolean;

  @ApiProperty({
    description: 'Status',
    required: true,
    type: Boolean
  })
  @IsOptional()
  @IsBoolean()
  readonly status: boolean;

}
