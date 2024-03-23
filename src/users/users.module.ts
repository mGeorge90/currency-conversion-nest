// users.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import {UsersController} from "./users.controller";

@Module({
    imports: [
        JwtModule.register({
            secret: 'secret', // Replace with your actual secret key
            signOptions: { expiresIn: '24h' }, // Customize expiration as needed
        }),
    ],
    providers: [UsersService],
    exports: [UsersService], // Export the UsersService if needed in other modules
    controllers: [UsersController],
})
export class UsersModule {}
