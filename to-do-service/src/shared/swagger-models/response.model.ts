import { ApiProperty } from '@nestjs/swagger';

export class MasterFilterResponse {
  @ApiProperty({
    description: 'Number of records returned in a page',
    required: false,
    type: Number
  })
  readonly page_size: number;

  @ApiProperty({
    description: 'Total pages',
    required: false,
    type: Number
  })
  readonly total_pages: number;

  @ApiProperty({
    description: 'Number of records in the DB table',
    required: false,
    type: Number
  })
  readonly total_items: number;
}

export class MasterErrorResponse {
  @ApiProperty({
    description: 'Error Name',
    required: false,
    type: String
  })
  readonly name: string;

  @ApiProperty({
    description: 'Action to display error message',
    required: false,
    type: Boolean,
    default: false
  })
  readonly display: boolean;

  @ApiProperty({
    description: 'Error Details',
    required: false,
    type: Array
  })
  readonly details: [];
}
