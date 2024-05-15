import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: 'user@email.com', description: 'email'})
  email: string;

  @ApiProperty({example: '12345678', description: 'password'})
  password: string;

  @ApiPropertyOptional({example: 'Kate', description: 'name'})
  name?: string;
}
