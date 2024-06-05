import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { LogoutUserDto } from './dto/logout-user.dto';

@Controller({ path: 'auth' })
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ operationId: 'register' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async register(
    @Body() body: AuthUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponseDto> {
    const data = await this.authService.register(body);
    response.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 24 * 60 * 60 * 1000,
    });
    return data;
  }

  @Post('/login')
  @ApiOperation({ operationId: 'login' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async login(@Body() body: AuthUserDto): Promise<AuthResponseDto> {
    return this.authService.login(body);
  }

  @Post('/logout')
  @ApiOperation({ operationId: 'logout' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async logout(@Body() body: LogoutUserDto) {
    return this.authService.logout(body);
  }

  @Get('/activate/:link')
  @ApiOperation({ operationId: 'activateLink' })
  @ApiResponse({ status: 200 })
  async activateLink(
    @Param('link') link: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.activateLink(link);
    return response.redirect(`${process.env.CLIENT_URL}`);
  }

  @Get('/refresh')
  @ApiOperation({ operationId: 'refreshToken' })
  @ApiResponse({ status: 200 })
  async refreshToken() {
    return this.authService.refreshToken();
  }
}
