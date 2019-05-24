import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsTsMapper } from 'js-ts-mapper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseCurrencyDto } from 'src/app/models/classes';

@Injectable()
export class ExchangeRateService {
    apiUrl = 'https://api.exchangeratesapi.io';
    private mapper = new JsTsMapper();
    constructor(private service: HttpClient) {}

    getBaseRate(currencyName = 'EUR'): Observable<BaseCurrencyDto> {
        return this.service.get(`${this.apiUrl}/latest?base=${currencyName}`).pipe(
            map(obj => {
                // console.log(this.mapper.deserialize<BaseCurrencyDto>(obj, BaseCurrencyDto));
                return this.mapper.deserialize<BaseCurrencyDto>(obj, BaseCurrencyDto);
            })
        );
    }
}
