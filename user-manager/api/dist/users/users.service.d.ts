import User from './entities/user.entity';
import { LoginDTO, UpdateDTO, UserDTO } from './entities/user.dto';
export declare class UsersService {
    private users;
    private accessed;
    getAll(): User[];
    getOne(id: string): User;
    deleteOne(id: string): boolean;
    signup(userData: UserDTO): boolean;
    login(loginData: LoginDTO): boolean;
    update(updateData: UpdateDTO): boolean;
}
