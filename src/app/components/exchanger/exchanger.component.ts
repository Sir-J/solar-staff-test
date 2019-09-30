import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseCurrencyDto, RateDto } from 'app/models/classes';
import { ExchangeRateService } from 'app/services';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subject, throwError } from 'rxjs';
import { catchError, debounceTime, finalize, takeUntil } from 'rxjs/operators';

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
    currencySum: number;
    resultChange: string;

    resultExchangeValueUpdate = new Subject();

    @BlockUI()
    blockUI: NgBlockUI;

    constructor(private route: ActivatedRoute, private service: ExchangeRateService, private toastr: ToastrService) {}

    ngOnInit() {
        this.currencyFrom = (this.route.snapshot.data['baseRate'] as BaseCurrencyDto).base;
        this.rates = (this.route.snapshot.data['baseRate'] as BaseCurrencyDto).rates.slice();
        this.currencies = this.rates.map((rate: RateDto) => rate.name);
        if (this.currencies.indexOf(this.currencyFrom) === -1) {
            this.currencies.push(this.currencyFrom);
            this.currencies.sort();
        }

        this.resultExchangeValueUpdate
            .pipe(
                takeUntil(this.ngUnsubscribe),
                debounceTime(500),
            )
            .subscribe(() => {
                this.resultChange =
                    this.currencyTo && this.currencySum
                        ? (this.rates.find(rate => rate.name === this.currencyTo).rate * this.currencySum).toFixed(2)
                        : '';
            });
    }

    getRate(): string {
        return this.currencyTo ? this.rates.find(rate => rate.name === this.currencyTo).rate.toFixed(2) : undefined;
    }

    changeCurrencySum(): void {
        this.resultExchangeValueUpdate.next();
    }

    swapCurrency() {
        this.blockUI.start();
        this.service
            .getBaseRate(this.currencyTo, this.exchangeDate)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                catchError(error => this.catchErrorFn(error)),
                finalize(() => this.blockUI.stop())
            )
            .subscribe((newModel: BaseCurrencyDto) => {
                this.currencyTo = this.currencyFrom;
                this.currencyFrom = newModel.base;
                this.rates = newModel.rates;
            });
    }

    update(): void {
        this.blockUI.start();
        this.service
            .getBaseRate(this.currencyFrom, this.exchangeDate)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                catchError(error => this.catchErrorFn(error)),
                finalize(() => this.blockUI.stop())
            )
            .subscribe((newModel: BaseCurrencyDto) => {
                this.currencyTo = this.currencyFrom !== this.currencyTo ? this.currencyTo : undefined;
                this.rates = newModel.rates;
            });
    }

    protected catchErrorFn(error: any) {
        this.toastr.error('Ошибка загрузки данных');
        return throwError(error);
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
