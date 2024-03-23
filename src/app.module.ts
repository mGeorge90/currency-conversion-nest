import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {CurrencyConversionModule} from "./currency_conversion/currency_conversion.module";
import { BullModule } from '@nestjs/bull';
import {SaveUserHistoryProcessor} from "./currency_conversion/save-user-history.processor";
import {JwtAuthGuard} from "./auth/jwt-auth/jwt-auth.guard";
import {JwtModule} from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
      UsersModule,
      CurrencyConversionModule,
      JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
              secret: configService.get<string>('JWT_SECRET'),
          }),
          inject: [ConfigService],
      }),
      BullModule.forRoot({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
      BullModule.registerQueue({
        name: 'user-history',
      })
  ],
  controllers: [AppController],
  providers: [AppService, SaveUserHistoryProcessor, JwtAuthGuard],
})
export class AppModule {}
