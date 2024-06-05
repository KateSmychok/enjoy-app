import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'email' })
  email: string;

  @ApiProperty({ example: '12345678', description: 'password' })
  password: string;

  @ApiProperty({
    example: 'dhui2t7rf-jbryfgfr-cjdbcrr-nj83gyg7',
    description: 'activationLink',
  })
  activationLink: string;
}
