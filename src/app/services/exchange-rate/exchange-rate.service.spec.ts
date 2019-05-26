import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ExchangeRateService } from './exchange-rate.service';

describe('ExchangeRateService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ExchangeRateService]
        })
    );

    it('should be created', () => {
        const service: ExchangeRateService = TestBed.get(ExchangeRateService);
        expect(service).toBeTruthy();
    });
});
