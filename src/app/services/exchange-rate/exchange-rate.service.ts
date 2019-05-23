import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ExchangeRateService {
    apiUrl = 'https://api.exchangeratesapi.io';
    constructor(private service: HttpClient) {}

    getBaseRate() {
        return this.service.get(`${this.apiUrl}/latest`);
    }
}
