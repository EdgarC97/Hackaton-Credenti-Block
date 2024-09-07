import { jwtVerify } from "jose";
import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
    expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
    expiresIn: "1h"
}

export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION){
    const secret_key = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secret_key!, options);
    return token;
}

export async function verifyJwt(token: string) {
    try {
      const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
      const { payload } = await jwtVerify(token, secretKey);
      return payload;
    } catch (error) {
      console.error("JWT verification failed", error);
      return null;
    }
  }