import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { BaseCurrencyDto, RateDto } from 'src/app/models/classes';
import { ExchangeRateService } from 'src/app/services';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-exchanger',
    templateUrl: './exchanger.component.html',
    styleUrls: ['./exchanger.component.less']
})
export class ExchangerComponent implements OnInit, OnDestroy {
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    currencyFrom: string;

    currencies: Array<string> = undefined;
    rates: Array<RateDto>;
    currencyTo: string;
    exchangeDate: Date = new Date();
    minDate = new Date(1999, 4, 1);
    maxDate = new Date();
    sum: number;

    constructor(private route: ActivatedRoute, private service: ExchangeRateService) {}

    ngOnInit() {
        this.currencyFrom = (this.route.snapshot.data['baseRate'] as BaseCurrencyDto).base;
        this.rates = (this.route.snapshot.data['baseRate'] as BaseCurrencyDto).rates.slice();
        this.currencies = this.rates.map((rate: RateDto) => rate.name);
        if (this.currencies.indexOf(this.currencyFrom) === -1) {
            this.currencies.push(this.currencyFrom);
            this.currencies.sort();
        }
    }

    getRate(): string {
        return this.currencyTo ? this.rates.find(rate => rate.name === this.currencyTo).value.toString() : '';
    }

    getValue() {
        return this.currencyTo && this.sum ? this.rates.find(rate => rate.name === this.currencyTo).value * this.sum : '';
    }

    swapCurrency() {
        const to = this.currencyTo;
        this.currencyTo = this.currencyFrom;
        this.currencyFrom = to;
        this.service
            .getBaseRate(this.currencyFrom, this.exchangeDate)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((newModel: BaseCurrencyDto) => {
                this.rates = newModel.rates;
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
