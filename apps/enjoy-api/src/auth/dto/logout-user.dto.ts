import { ApiProperty } from '@nestjs/swagger';

export class LogoutUserDto {
  @ApiProperty({ example: '1', description: 'id' })
  id: number;
}
