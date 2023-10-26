import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}
  @Post('login')
  async login() {
    return { message: 'Login' };
  }
  @Post('register')
  async register() {
    return { message: 'Register' };
  }
}
