export abstract class AuthService {
  abstract hashPassword(password: string): Promise<string>;
  abstract comparePasswords(password: string, hash: string): Promise<boolean>;
}
