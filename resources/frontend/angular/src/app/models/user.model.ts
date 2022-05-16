export class User {
  protected constructor(
    public email: string) {
  }

  public static from(user: User): User {
    return new User(user.email);
  }
}
