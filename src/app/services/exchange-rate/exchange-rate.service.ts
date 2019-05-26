import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCurrencyDto, RateDto } from 'app/models/classes';
import { JsTsMapper } from 'js-ts-mapper';
import * as moment from 'moment/moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RateConverter } from 'app/converters/rate.converter';

@Injectable()
export class ExchangeRateService {
    apiUrl = 'https://api.exchangeratesapi.io';
    private mapper = new JsTsMapper();
    constructor(private service: HttpClient) {}

    getBaseRate(currency: string, date: Date, rates?: Array<string>): Observable<BaseCurrencyDto> {
        return this.service
            .get(
                `${this.apiUrl}/${moment(date).format('YYYY-MM-DD')}?base=${currency}${
                    rates && rates.length ? `&symbols=${rates.join(',')}` : ''
                }`
            )
            .pipe(
                map((obj: any) => {
                    const dto = new BaseCurrencyDto();
                    dto.base = obj.base;
                    dto.date = obj.date;
                    dto.rates = new RateConverter().deserialize(obj.rates);
                    // return this.mapper.deserialize<BaseCurrencyDto>(obj, BaseCurrencyDto);
                    return dto;
                })
            );
    }
}
