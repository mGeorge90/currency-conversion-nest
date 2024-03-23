import {Controller, Post, Body, HttpCode, Get, UseGuards, Req} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request. Please check the request body.' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return { user };
  }

  @Post('login')
  @HttpCode(200) // Set the HTTP status code to 200 explicitly for login
  @ApiResponse({ status: 200, description: 'User logged in successfully.', type: String }) // Optional: Define the response schema
  @ApiResponse({ status: 400, description: 'Bad request. Please check the request body.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid credentials.' })
  async login(@Body() loginUserDto: LoginUserDto) {
    const { token } = await this.usersService.login(loginUserDto);
    return { token };
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: 'User history retrieved successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid credentials.' })
    async getUserHistory(
      @Req() req,
  ) {
        const userHistory = await this.usersService.getUserHistory(req.user.sub);
        return { userHistory };
    }
}
