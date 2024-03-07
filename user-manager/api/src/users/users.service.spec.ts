import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'

describe('UsersService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll()
      expect(result).toBeInstanceOf(Array)
    })
  })

  describe('getOne', () => {
    it('should return an user', () => {
      service.signup({
        id: 'mark',
        password: '1234',
        phone: 123456,
        nickname: 'abc',
      })
      const user = service.getOne('mark')
      expect(user).toBeDefined()
      expect(user.phone).toEqual(123456)
    })
  })

  it('should be undefined', () => {
    const who = service.getOne('jane')
    expect(who).toBeUndefined()
  })

  describe('signup', () => {
    it('should return an user', () => {
      const beforeCreate = service.getAll().length
      service.signup({
        id: 'jane',
        password: '4321',
        phone: 654321,
        nickname: 'cba',
      })
      const afterCreate = service.getAll().length
      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })

    it('should be same length', () => {
      service.signup({
        id: 'jane',
        password: '4321',
        phone: 654321,
        nickname: 'cba',
      })
      const beforeCreate = service.getAll().length

      // sign up with same id
      service.signup({
        id: 'jane',
        password: 'abc',
        phone: 151515,
        nickname: '?',
      })
      const afterCreate = service.getAll().length
      expect(afterCreate).toEqual(beforeCreate)
    })
  })

  describe('login', () => {
    it('should return true', () => {
      service.signup({
        id: 'mark',
        password: '1234',
        phone: 123456,
        nickname: 'abc',
      })

      const loginResult = service.login({
        id: 'mark',
        password: '1234',
      })
      expect(loginResult).toBe(true)
    })

    // wrong password
    it('should return true', () => {
      service.signup({
        id: 'mark',
        password: '1234',
        phone: 123456,
        nickname: 'abc',
      })

      const loginResult = service.login({
        id: 'mark',
        password: '1212',
      })
      expect(loginResult).toBe(false)
    })

    // non exist id
    it('should return true', () => {
      service.signup({
        id: 'mark',
        password: '1234',
        phone: 123456,
        nickname: 'abc',
      })

      const loginResult = service.login({
        id: 'jane',
        password: '1212',
      })
      expect(loginResult).toBe(false)
    })
  })

  describe('update', () => {
    it('should update phone', () => {
      service.signup({
        id: 'mark',
        password: '1234',
        phone: 123456,
        nickname: 'abc',
      })
      service.login({
        id: 'mark',
        password: '1234',
      })

      // fixme : id는 필수, 나머지는 optional로 update에는 들어가지 않도록
      service.update({
        id: 'mark',
        password: '1234',
        phone: 7777,
        nickname: 'abc',
      })

      const user = service.getOne('mark')
      expect(user.phone).toEqual(7777)
      expect(user.nickname).toEqual('abc')
    })

    it('should return false', () => {
      const result = service.update({
        id: 'jake',
        password: '1234',
        phone: 7777,
        nickname: 'abc',
      })

      expect(result).toBe(false)
    })
  })

  describe('delete', () => {
    it('should return true', () => {
      service.signup({
        id: 'mark',
        password: '1234',
        phone: 123456,
        nickname: 'abc',
      })
      service.login({
        id: 'mark',
        password: '1234',
      })

      const result = service.deleteOne('mark')
      expect(result).toBe(true)
    })

    it('should return false', () => {
      service.signup({
        id: 'mark',
        password: '1234',
        phone: 123456,
        nickname: 'abc',
      })
      service.login({
        id: 'mark',
        password: '1234',
      })

      const result = service.deleteOne('jake')
      expect(result).toBe(false)
    })
  })
})
