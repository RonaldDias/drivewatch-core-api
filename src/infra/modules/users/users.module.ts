import { Module } from "@nestjs/common";
import { RegisterUser } from "src/application/use-cases/RegisterUser";
import { Argon2Adapter } from "src/infra/cryptography/Argon2Adapter";
import { MemoryUserRepository } from "src/infra/database/memory/MemoryUserRepository";

@Module({
    providers: [
        {
            provide: 'Hasher',
            useClass: Argon2Adapter
        },
        {
            provide: 'UserRepository',
            useClass: MemoryUserRepository
        },
        {
            provide: RegisterUser,
            useFactory: (userRepo: MemoryUserRepository, hasher: Argon2Adapter) => {
                return new RegisterUser(userRepo, hasher);
            },
            inject: ['UserRepository', 'Hasher']
        },
    ],
})

export class UsersModule {}