import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { IPayload } from "../context/types";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: IPayload) {
    return {
      id: payload.sub,
      username: payload.username,
      email: payload.email,
    }
  }
}