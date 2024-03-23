import {Controller, Get, Query, Req, Res, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { CurrencyConversionService } from './currency_conversion.service';

@Controller()
export class CurrencyConversionController {
    constructor(private readonly currencyService: CurrencyConversionService) {}

    @Get('convert')
    @UseGuards(JwtAuthGuard)
    async convert(
        @Query('from') from: string,
        @Query('to') to: string,
        @Query('amount') amount: number,
        @Req() req,
        @Res() res,
    ) {
        try {
            const userId = req.user.sub;
            const convertedAmount = await this.currencyService.convert(from.toUpperCase(), to.toUpperCase(), amount, userId);
            res.json({ message: 'Successful Conversion', data: { amount: convertedAmount } });
        } catch (error) {
            console.error('Error converting currency:', error);
            res.status(500).json({ error: error.message });
        }
    }
}
