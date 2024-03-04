import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { LoginDTO, UpdateDTO, UserDTO } from './entities/user.dto'
import User from './entities/user.entity'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): User[] {
    return this.usersService.getAll()
  }

  @Post()
  signup(@Body() userData: UserDTO) {
    console.log(userData)
    return this.usersService.signup(userData)
  }

  @Get('login')
  login(@Body() loginData: LoginDTO) {
    return this.usersService.login(loginData)
  }

  @Patch('update')
  update(@Body() updateData: UpdateDTO) {
    return this.usersService.update(updateData)
  }

  @Delete('delete')
  remove(@Body() id: string) {
    return this.usersService.deleteOne(id)
  }
}
