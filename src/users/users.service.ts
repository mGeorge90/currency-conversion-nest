import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  constructor(
      private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ user: User; token: string }> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.prisma.user.create({ data: createUserDto });
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { user: { ...user, password: undefined }, token };
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Check if passwords match (You need to implement this logic)
    const passwordsMatch = await bcrypt.compare(loginUserDto.password, user.password)

    if (!passwordsMatch) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async saveUserHistory(data: any) {
    const userHistory = await this.prisma.userHistory.create({ data });
  }

  async getUserHistory(userId: string) {
    return this.prisma.userHistory.findMany({where: {userId}});
  }
}
