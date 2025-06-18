export class User {
  id: string;
  email?: string;
  password?: string;
  username?: string;
  createdAt: Date;
  updatedAt: Date;

  static fromId(id: string): User {
    const user = new User();
    user.id = id;
    return user;
  }
}
