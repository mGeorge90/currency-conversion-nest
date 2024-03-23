import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {InjectQueue} from "@nestjs/bull";
import {Queue} from "bull";

@Injectable()
export class CurrencyConversionService {
    constructor(@InjectQueue('user-history') private userHistoryQueue: Queue) {}
    async convert(fromCurrency: string, toCurrency: string, amount: number, userId: string): Promise<number> {
        const exchangeRateAPIKey = process.env.EXCHANGE_RATE_API_KEY;
        try {
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/${exchangeRateAPIKey}/latest/${fromCurrency}`);
            const exchangeRate = response.data?.conversion_rates;
            const exchangeRateTarget = exchangeRate[toCurrency];
            if (!exchangeRateTarget) {
                throw new Error('Invalid currency');
            }
            const result = Math.round(exchangeRateTarget * amount * 100) / 100;
            amount = Math.round(amount * 100) / 100;
            await this.userHistoryQueue.add({fromCurrency, toCurrency, amount, result, userId});
            return result;
        } catch (error) {
            throw new Error('Error converting currency');
        }
    }
}
