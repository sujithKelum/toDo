import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteDto {
  @ApiProperty({
    description: 'Id of the deleted by user',
    required: true,
    type: String
  })
  @IsNotEmpty()
  readonly deleted_by: string;
}
