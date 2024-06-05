import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  refreshToken: string;
}
