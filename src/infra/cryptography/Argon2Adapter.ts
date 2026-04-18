import * as argon2 from "argon2";
import { Hasher } from "../../application/protocols/cryptography/Hasher";

export class Argon2Adapter implements Hasher {
  private readonly config = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  };

  public async hash(plaintext: string): Promise<string> {
    return argon2.hash(plaintext, this.config);
  }

  public async compare(plaintext: string, digest: string): Promise<boolean> {
    return argon2.verify(digest, plaintext);
  }
}
