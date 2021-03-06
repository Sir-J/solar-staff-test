import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DefaultPageComponent } from 'app/components';
import { MaterialModule } from 'app/material.module';
import { BaseRateResolver } from 'app/resolver';
import { ExchangeRateService } from 'app/services';
import { BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExchangerComponent } from './components/exchanger/exchanger.component';

@NgModule({
    declarations: [AppComponent, DefaultPageComponent, ExchangerComponent],
    imports: [
        BrowserModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true
        }),
        BlockUIModule.forRoot({
            message: 'Загружаем курс ...',
            delayStop: 500
        }),
        AppRoutingModule
    ],
    providers: [BaseRateResolver, ExchangeRateService, { provide: MAT_DATE_LOCALE, useValue: 'ru-Ru' }],
    bootstrap: [AppComponent]
})
export class AppModule {}
