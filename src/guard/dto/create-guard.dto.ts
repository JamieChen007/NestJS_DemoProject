import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateGuardDto {
  @ApiProperty({ example: 'jamie', required: true })
  name: string;
  @ApiProperty({ example: 18 })
  age: number;
}
