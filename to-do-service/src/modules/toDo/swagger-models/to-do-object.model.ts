import { ApiProperty } from '@nestjs/swagger';

export class ToDoObject {
  @ApiProperty({
    description: 'Id of the to Do',
    type: String,
    uniqueItems: true,
  })
  id: string;

  @ApiProperty({
    description: 'Name',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Complete',
    type: String,
  })
  complete: string;

  @ApiProperty({
    description: 'Status',
    type: String,
  })
  status: string;

}
