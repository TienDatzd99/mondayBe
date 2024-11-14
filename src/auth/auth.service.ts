/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async redirectUser(email: string, res: Response) {
    try {
      const checkExist = await this.userService.findUserbyEmail(email);
      if (!checkExist) {
        return res.redirect('https://login.codezuni.com/');
      } else {
        return res.redirect('https://www.youtube.com/');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async validateUser(payload: JwtPayload) {
    const user = await this.userService.findUserByEmail(payload.email);
    if (user) {
      return user;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const payload: JwtPayload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
  }
}