import { Body, Controller, Post } from '@nestjs/common';
import {
  RegisterUser,
  RegisterUserDto,
} from 'src/application/use-cases/RegisterUser';

@Controller('users')
export class UsersController {
  constructor(private readonly registerUserUseCase: RegisterUser) {}

  @Post()
  public async create(@Body() body: RegisterUserDto) {
    const user = await this.registerUserUseCase.execute(body);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
