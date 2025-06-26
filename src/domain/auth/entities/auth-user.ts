export class AuthUser {
  id: string;
  username: string;
  email: string;
  password: string;
  passwordRaw: string;
  refreshToken: string | null;
  isAdmin: boolean = true;
}
