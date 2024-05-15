import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "../users/dto/user.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller({ path: 'auth' })
@ApiTags('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('/login')
  @ApiOperation({ operationId: 'login' })
  @ApiResponse({ status: 200, type: UserDto })
  async login(@Body() body: CreateUserDto): Promise<{token: string}> {
    return this.authService.login(body);
  }

  @Post('/register')
  @ApiOperation({ operationId: 'register' })
  @ApiResponse({ status: 200, type: UserDto })
  async register(@Body() body: CreateUserDto): Promise<{token: string}> {
    return this.authService.register(body);
  }
}
