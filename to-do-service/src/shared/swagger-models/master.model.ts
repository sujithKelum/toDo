import { ApiProperty } from '@nestjs/swagger';

export class MasterObject {
  @ApiProperty({
    description: 'Id of the object',
    type: String
  })
  id: string;

  @ApiProperty({
    description: 'Created by user',
    type: Number
  })
  created_by: number;

  @ApiProperty({
    description: 'Updated by user',
    type: Number
  })
  updated_by: number;

  @ApiProperty({
    description: 'Deleted by user',
    type: Number
  })
  deleted_by: number;

  @ApiProperty({
    description: 'Created date time',
    type: Date
  })
  created_at: Date;

  @ApiProperty({
    description: 'Updated date time',
    type: Date
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Deleted date time',
    type: Date
  })
  deleted_at: Date;
}
