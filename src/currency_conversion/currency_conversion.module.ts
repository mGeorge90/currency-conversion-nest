// currency-conversion.module.ts
import { Module } from '@nestjs/common';
import { CurrencyConversionController } from './currency_conversion.controller';
import { CurrencyConversionService } from './currency_conversion.service';
import { BullModule } from '@nestjs/bull';
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        BullModule.registerQueue({ name: 'user-history' }),
        JwtModule.register({
            secret: 'secret'
        }),
    ],
    controllers: [CurrencyConversionController],
    providers: [CurrencyConversionService],
})
export class CurrencyConversionModule {}
