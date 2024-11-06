import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from './user.entity';
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from 'src/dto/user/create-use.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  private async comparePasswords(
    userPassword: string,
    currentPassword: string,
) {
    return await bcrypt.compare(currentPassword, userPassword);
}
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }


  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneBy(email: string):Promise<User> {
    return this.userRepository.findOne({where:{email: email}})
  }

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save({
      ...createUserDto,
      createdAt: new Date(),
  });
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

