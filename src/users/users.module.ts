// users.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import {UsersController} from "./users.controller";
import * as process from "process";

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    providers: [UsersService],
    exports: [UsersService], // Export the UsersService if needed in other modules
    controllers: [UsersController],
})
export class UsersModule {}
