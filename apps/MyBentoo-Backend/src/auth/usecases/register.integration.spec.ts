
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUseCase } from './register.usecase';
import { User } from '../domain/entities/user.entity';
import { TypeOrmUserRepository } from '../infrastructure/repositories/user.repository.impl';
import { BcryptAuthService } from '../infrastructure/services/auth.service.impl';
import { UserRepository } from '../domain/repositories/user.repository';
import { AuthService } from '../domain/services/auth.service';
import { ModuleRef } from '@nestjs/core';

jest.setTimeout(20000);

describe('RegisterUseCase (Integration)', () => {
  let registerUseCase: RegisterUseCase;
  let moduleRef;

  beforeAll(async () => {
    console.log('[TEST] Initialisation du module de test');

    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            console.log('[DB] Configuration chargée');
            return {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'mybentoo_user',
            password: 'mybentoo_password',
            database: 'mybentoo_test',
            entities: [User],
            synchronize: true,
            autoLoadEntities: true,
          };
        },
        inject: [],
      }),
      ],
      providers: [
        RegisterUseCase,
        {
          provide: UserRepository,
          useClass: TypeOrmUserRepository,
        },
        {
          provide: AuthService,
          useClass: BcryptAuthService,
        },
      ],
    }).compile();

    registerUseCase = moduleRef.get(RegisterUseCase);
  });

  afterAll(async () => {
    if (moduleRef) {
      await moduleRef.close();
    }
  });

  it('should register a user in database', async () => {
    const dto = {
      username: 'bob',
      email: 'bob@test.com',
      password: 'securepass123',
    };

    const result = await registerUseCase.execute(dto);

    expect(result).toHaveProperty('id');
    expect(result).toMatchObject({
      username: dto.username,
      email: dto.email,
    });
  });
});
