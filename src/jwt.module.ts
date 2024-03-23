import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module'; // Import your UsersModule

@Module({
    imports: [
        JwtModule.register({
            secret: 'your_secret_key_here',
            signOptions: { expiresIn: '24h' },
        }),
        UsersModule,
    ],
})
export class AppModule {}
