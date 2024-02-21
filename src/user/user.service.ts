import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IFindUser } from './interfaces/find-user.interface';
import { IUser } from './interfaces/user.interface';
import { IUserUpdate } from './interfaces/user-update.interface';
import { ICreateUser } from './interfaces/create-user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(payload: ICreateUser) {
    const user = this.userRepository.create(payload);

    return this.userRepository.save(user);
  }

  async findAll(): Promise<IUser[]> {
    const users = this.userRepository.find();

    return users;
  }

  async findOne(payload: IFindUser): Promise<IUser> {
    const user = this.userRepository.findOne({ where: payload });

    return user;
  }

  async banById(id: number): Promise<boolean> {
    const payload: IUserUpdate = {
      where: { id },
      fields: { isBanned: true },
    };
    return this.update(payload);
  }

  async changePasswordById(id: number, password: string): Promise<boolean> {
    const payload: IUserUpdate = {
      where: { id },
      fields: { password },
    };
    return this.update(payload);
  }

  async update(payload: IUserUpdate): Promise<boolean> {
    const result = await this.userRepository.update(
      payload.where,
      payload.fields,
    );

    return result.affected > 0;
  }
}
