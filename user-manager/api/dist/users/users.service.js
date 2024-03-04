"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor() {
        this.users = [];
        this.accessed = false;
    }
    getAll() {
        return this.users;
    }
    getOne(id) {
        const user = this.users.find((u) => u.id == id);
        return user;
    }
    deleteOne(id) {
        if (!this.accessed)
            return false;
        const user = this.getOne(id);
        if (user !== undefined) {
            this.users = this.users.filter((u) => u.id !== id);
            this.accessed = false;
            return true;
        }
        return false;
    }
    signup(userData) {
        const user = this.getOne(userData.id);
        if (user !== undefined)
            return false;
        this.users.push({
            ...userData,
        });
        return true;
    }
    login(loginData) {
        const user = this.users.find((u) => u.id == loginData.id && u.password == loginData.password);
        console.log(this.users);
        console.log(user);
        if (user === undefined) {
            return false;
        }
        else {
            this.accessed = true;
            return true;
        }
    }
    update(updateData) {
        if (!this.accessed)
            return false;
        const id = updateData.id;
        const user = this.getOne(id);
        if (user !== undefined) {
            if (updateData.password)
                user.password = updateData.password;
            if (updateData.phone)
                user.phone = updateData.phone;
            if (updateData.nickname)
                user.nickname = updateData.nickname;
            this.deleteOne(id);
            this.users.push({ ...user });
            return true;
        }
        return false;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map