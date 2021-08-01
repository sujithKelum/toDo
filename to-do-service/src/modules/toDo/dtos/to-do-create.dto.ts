import { IsNotEmpty, IsBoolean , IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ToDoCreateDto {
  @ApiProperty({
    description: 'Name',
    required: true,
    type: String
  })
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;

  @ApiProperty({
    description: 'End Date',
    type: Date
  })
  @IsNotEmpty()
  end_date: Date;
}
