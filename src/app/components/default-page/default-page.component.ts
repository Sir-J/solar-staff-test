import { Component, OnInit } from '@angular/core';
import { FilterDto } from 'src/app/models/classes/filter.dto';
import { ActivatedRoute } from '@angular/router';
import { BaseCurrencyDto, RateDto } from 'src/app/models/classes';

@Component({
    selector: 'app-default-page',
    templateUrl: './default-page.component.html',
    styleUrls: ['./default-page.component.less']
})
export class DefaultPageComponent implements OnInit {
    filter: FilterDto = new FilterDto();
    currencies: Array<string> = new Array<string>();
    model: BaseCurrencyDto;
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.model = this.route.snapshot.data['baseRate'] as BaseCurrencyDto;
        this.currencies = this.model.rates.map((rate: RateDto) => rate.name);
        if (this.currencies.indexOf(this.model.base) === -1) {
            this.currencies.push(this.model.base);
            this.currencies.sort();
        }
        this.filter.currency = this.model.base;
    }
}
