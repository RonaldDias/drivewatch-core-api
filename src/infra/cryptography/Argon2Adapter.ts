import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";
import { Hasher } from "src/application/protocols/cryptography/Hasher";

@Injectable()
export class Argon2Adapter implements Hasher {
    public async hash(plaintext: string): Promise<string> {
        return argon2.hash(plaintext);
    }

    public async compare(plaintext: string, digest: string): Promise<boolean> {
        return argon2.verify(digest, plaintext);
    }
}