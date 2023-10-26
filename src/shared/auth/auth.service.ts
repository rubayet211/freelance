import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login() {
    return { message: 'Login' };
  }
  async register() {
    return { message: 'Register' };
  }
  async validateUser() {
    return { message: 'Validate User' };
  }
}
