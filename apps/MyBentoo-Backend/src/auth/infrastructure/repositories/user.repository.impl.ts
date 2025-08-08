import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User) 
    private readonly ormRepo: Repository<User>,
  ) {
    console.log('[INJECT] TypeOrmUserRepository initialisé avec InjectRepository(User)');
  }
  async findByEmail(email: string) {
    return this.ormRepo.findOne({ where: { email } });
  }

  async create(user: Partial<User>) {
    return this.ormRepo.save(this.ormRepo.create(user));
  }
}
