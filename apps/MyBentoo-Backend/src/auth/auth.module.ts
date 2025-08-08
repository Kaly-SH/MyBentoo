import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { TypeOrmUserRepository } from './infrastructure/repositories/user.repository.impl';
import { RegisterUseCase } from './usecases/register.usecase';
import { AuthService } from './domain/services/auth.service';
import { BcryptAuthService } from './infrastructure/services/auth.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    RegisterUseCase,
    {
      provide: 'UserRepository',
      useClass: TypeOrmUserRepository,
    },
    {
      provide: 'AuthService',
      useClass: BcryptAuthService,
    },
  ],
  exports: [RegisterUseCase],
})
export class AuthModule {}
