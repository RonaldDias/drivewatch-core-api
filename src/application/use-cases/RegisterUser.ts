import { User } from "../../domain/entities/User";
import { Hasher } from "../protocols/cryptography/Hasher";
import { UserRepository } from "../protocols/repositories/UserRepository";

export interface RegisterUserDto {
  name: string;
  email: string;
  passwordRaw: string;
  role: "admin" | "fleet_manager" | "driver";
}

export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
  ) {}

  public async execute(data: RegisterUserDto): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error("Este email já está em uso.");
    }

    const hashedPassword = await this.hasher.hash(data.passwordRaw);

    const newUser = User.create({
      name: data.name,
      email: data.email,
      passwordHash: hashedPassword,
      role: data.role,
    });

    await this.userRepository.save(newUser);

    return newUser;
  }
}
