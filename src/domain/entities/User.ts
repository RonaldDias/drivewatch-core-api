export interface UserProps {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "fleet_manager" | "driver";
  createdAt?: Date;
}

export class User {
  public readonly id?: string;
  public name: string;
  public email: string;
  public passwordHash: string;
  public role: "admin" | "fleet_manager" | "driver";
  public readonly createdAt?: Date;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.passwordHash = props.passwordHash;
    this.role = props.role;
    this.createdAt = props.createdAt || new Date();
  }

  public static create(props: UserProps): User {
    return new User({
      ...props,
      email: props.email.toLowerCase(),
    });
  }
}
