import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
import { DefaultPageComponent } from 'src/app/components';
import { MaterialModule } from 'src/app/material.module';
import { BaseRateResolver } from 'src/app/resolver';
import { ExchangeRateService } from 'src/app/services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MAT_DATE_LOCALE } from '@angular/material';
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
        BlockUIModule.forRoot(),
        AppRoutingModule
    ],
    providers: [BaseRateResolver, ExchangeRateService, { provide: MAT_DATE_LOCALE, useValue: 'ru-Ru' }],
    bootstrap: [AppComponent]
})
export class AppModule {}
