// /* eslint-disable prettier/prettier */
// import { Controller, Get, Req, UseGuards, Request, Res } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { Response } from 'express';
// import { GoogleAuthGuard } from './google-auth.guard';




// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Get('google')
//   @UseGuards(GoogleAuthGuard)
//   async googleAuth(@Req() req) {
//     // Initiates the Google OAuth2 login flow
//   }

//   @Get('google/callback')
//   @UseGuards(AuthGuard('google'))
//   googleLoginCallback(
//     @Request() req: any,
//     @Res() res: Response,
//   ) {
//     // Handle the Google OAuth2 callback
//    this.authService.redirectUser(req.user.email, res);
//   }
// }
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Req, UseGuards, Request, Res, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { GoogleAuthGuard } from './google-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

class LoginDto {
  email: string;
  password: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {
    // Initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(
    @Request() req: any,
    @Res() res: Response,
  ) {
    // Handle the Google OAuth2 callback
    this.authService.redirectUser(req.user.email, res);
  }

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập' })
  @ApiResponse({ status: 201, description: 'Đăng nhập thành công' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}