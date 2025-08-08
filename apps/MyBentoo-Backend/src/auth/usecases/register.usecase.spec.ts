import { RegisterUseCase } from './register.usecase';
import { UserRepository } from '../domain/repositories/user.repository';
import { AuthService } from '../domain/services/auth.service';

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;
  let userRepository: UserRepository;
  let authService: AuthService;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as any;

    authService = {
      hashPassword: jest.fn(),
    } as any;

    registerUseCase = new RegisterUseCase(userRepository, authService);
  });

  it('should register a new user', async () => {
    const dto = {
      username: 'Alice',
      email: 'alice@example.com',
      password: 'secure123',
    };

    (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
    (authService.hashPassword as jest.Mock).mockResolvedValue('hashed123');
    (userRepository.create as jest.Mock).mockResolvedValue({
      id: '1',
      username: dto.username,
      email: dto.email,
      password: 'hashed123',
    });

    const result = await registerUseCase.execute(dto);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(dto.email);
    expect(authService.hashPassword).toHaveBeenCalledWith(dto.password);
    expect(userRepository.create).toHaveBeenCalledWith({
      username: dto.username,
      email: dto.email,
      password: 'hashed123',
    });

    expect(result).toEqual({
      id: '1',
      username: dto.username,
      email: dto.email,
    });
  });

  it('should throw if email already exists', async () => {
    const dto = {
      username: 'Alice',
      email: 'alice@example.com',
      password: 'secure123',
    };

    (userRepository.findByEmail as jest.Mock).mockResolvedValue({ id: 'existing' });

    await expect(registerUseCase.execute(dto)).rejects.toThrow('Email already in use');
  });
});
