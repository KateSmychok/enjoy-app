import {Body, Controller, Get, Param, Post, Req, Res} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthUserInputDto } from './dto/auth-user-input.dto';

@Controller({ path: 'auth' })
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ operationId: 'register' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async register(
    @Body() body: AuthUserInputDto,
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
  async login(
    @Body() body: AuthUserInputDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponseDto> {
    const data = await this.authService.login(body);
    response.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 24 * 60 * 60 * 1000,
    });
    return data;
  }

  @Post('/logout')
  @ApiOperation({ operationId: 'logout' })
  @ApiResponse({ status: 200 })
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    ) {
    const { refreshToken } = request.cookies;
    response.clearCookie('refreshToken');
    return this.authService.logout(refreshToken);
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
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refreshToken } = request.cookies;
    const data = await this.authService.refreshToken(refreshToken);
    response.cookie('refreshToken', data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 24 * 60 * 60 * 1000,
    });
    return data;
  }
}
