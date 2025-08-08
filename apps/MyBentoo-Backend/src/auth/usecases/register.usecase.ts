import { UserRepository } from '../domain/repositories/user.repository';
import { AuthService } from '../domain/services/auth.service';

interface RegisterDTO {
  username: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {
    console.log('[INJECT] RegisterUseCase initialisé avec UserRepository + AuthService', { userRepository: this.userRepository, authService: this.authService });
  }
  async execute(dto: RegisterDTO) {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await this.authService.hashPassword(dto.password);

    const user = await this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    });

    // On retourne l'utilisateur sans le mot de passe
    const { password, ...result } = user;
    return result;
  }
}
