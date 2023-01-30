import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { PrismaService } from "../../../database/prisma.service";
import { GetUserResultType } from "../models/results";

@Controller()
export class AuthController {
  constructor(
    private prismaService: PrismaService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/protect')
  async getUserByToken(@Request() req: any): Promise<GetUserResultType> {
    let email = req.user.email;
    const user = await this.prismaService.user.findFirst({
      where: {email}
    });
    if(!user) {return {user: null, success: false}}

    const {passwordHash, ...data} = user;

    return {user: data, success: true}
  }
}