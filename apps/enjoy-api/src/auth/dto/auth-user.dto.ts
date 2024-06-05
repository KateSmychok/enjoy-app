import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'email' })
  email: string;

  @ApiProperty({ example: '12345678', description: 'password' })
  password: string;
}
