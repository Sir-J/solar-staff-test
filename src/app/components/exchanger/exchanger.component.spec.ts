import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'app/app-routing.module';
import { DefaultPageComponent } from 'app/components';
import { MaterialModule } from 'app/material.module';
import { getBaseCurrencyMock } from 'app/models/mock/base-currency.mock';
import { BaseRateResolver } from 'app/resolver';
import { ExchangeRateService } from 'app/services';
import { ExchangeRateMockService } from 'app/services/exchange-rate/exchange-rate.mock.service.mock';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ExchangerComponent } from './exchanger.component';

describe('ExchangerComponent', () => {
    let component: ExchangerComponent;
    let fixture: ComponentFixture<ExchangerComponent>;
    const route = ({
        snapshot: {
            data: {
                baseRate: getBaseCurrencyMock()
            }
        }
    } as any) as ActivatedRoute;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, FormsModule, MaterialModule, RouterTestingModule.withRoutes(routes), ToastrModule.forRoot()],
            declarations: [DefaultPageComponent, ExchangerComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: ExchangeRateService,
                    useClass: ExchangeRateMockService
                },
                ToastrService,
                BaseRateResolver,
                { provide: ActivatedRoute, useValue: route }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ExchangerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
