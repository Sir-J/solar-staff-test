import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseCurrencyDto } from 'app/models/classes';
import { JsTsMapper } from 'js-ts-mapper';
import * as moment from 'moment/moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExchangeRateService {
    apiUrl = 'https://api.exchangeratesapi.io';
    private mapper = new JsTsMapper();
    constructor(private service: HttpClient) {}

    getBaseRate(currency: string, date: Date, rates?: Array<string>): Observable<BaseCurrencyDto> {
        return this.service
            .get(`${this.apiUrl}/${moment(date).format('YYYY-MM-DD')}?base=${currency}${rates ? `&symbols=${rates.join(',')}` : ''}`)
            .pipe(
                map(obj => {
                    return this.mapper.deserialize<BaseCurrencyDto>(obj, BaseCurrencyDto);
                })
            );
    }
}
