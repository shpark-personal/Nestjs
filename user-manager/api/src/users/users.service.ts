import { Injectable } from '@nestjs/common'
import User from './entities/user.entity'
import { LoginDTO, UpdateDTO, UserDTO } from './entities/user.dto'

@Injectable()
export class UsersService {
  private users: User[] = []
  private accessed = false

  getAll(): User[] {
    return this.users
  }

  getOne(id: string): User {
    const user = this.users.find((u) => u.id == id)
    return user
  }

  deleteOne(id: string): boolean {
    if (!this.accessed) return false
    const user = this.getOne(id)
    if (user !== undefined) {
      this.users = this.users.filter((u) => u.id !== id)
      this.accessed = false
      return true
    }
    return false
  }

  signup(userData: UserDTO): boolean {
    const user = this.getOne(userData.id)
    if (user !== undefined) return false
    this.users.push({
      ...userData,
    })
    return true
  }

  login(loginData: LoginDTO): boolean {
    const user = this.users.find(
      (u) => u.id == loginData.id && u.password == loginData.password,
    )
    console.log(this.users)
    console.log(user)
    if (user === undefined) {
      return false
    } else {
      this.accessed = true
      return true
    }
  }

  update(updateData: UpdateDTO): boolean {
    if (!this.accessed) return false
    const id = updateData.id
    const user = this.getOne(id)

    if (user !== undefined) {
      if (updateData.password) user.password = updateData.password
      if (updateData.phone) user.phone = updateData.phone
      if (updateData.nickname) user.nickname = updateData.nickname
      this.deleteOne(id)
      this.users.push({ ...user })
      return true
    }
    return false
  }
}
