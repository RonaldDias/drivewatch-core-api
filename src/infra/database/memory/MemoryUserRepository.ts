import { Injectable } from "@nestjs/common";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../application/protocols/repositories/UserRepository";

@Injectable()
export class MemoryUserRepository implements UserRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | null> {
    const userFound = this.users.find((user) => user.email === email);
    return userFound || null;
  }

  public async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
