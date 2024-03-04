import { IsNumber, IsOptional, IsString } from 'class-validator'

export class UserDTO {
  @IsString()
  readonly id: string
  @IsString()
  readonly password: string
  @IsNumber()
  readonly phone: number

  @IsOptional()
  @IsString()
  readonly nickname: string
}

export class UpdateDTO {
  @IsString()
  readonly id: string

  @IsOptional()
  @IsString()
  readonly password: string

  @IsOptional()
  @IsString()
  readonly phone: number

  @IsOptional()
  @IsString()
  readonly nickname: string
}

export class LoginDTO {
  @IsString()
  readonly id: string
  @IsString()
  readonly password: string
}
