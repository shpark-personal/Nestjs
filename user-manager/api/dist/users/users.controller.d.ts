import { UsersService } from './users.service'
import { LoginDTO, UpdateDTO, UserDTO } from './entities/user.dto'
import User from './entities/user.entity'
export declare class UsersController {
  private readonly usersService
  constructor(usersService: UsersService)
  getAll(): User[]
  signup(userData: UserDTO): boolean
  login(loginData: LoginDTO): boolean
  update(updateData: UpdateDTO): boolean
  remove(id: string): boolean
}
