import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
import { AppRouterModule } from 'src/app/app.router';
import { ExchangeRateService } from 'src/app/services';

import { AppComponent } from './app.component';
import { DefaultPageComponent } from './components';
import { BaseRateResolver } from 'src/app/resolver';

@NgModule({
    declarations: [AppComponent, DefaultPageComponent],
    imports: [
        BrowserModule,
        AppRouterModule,
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true
        }),
        BlockUIModule.forRoot()
    ],
    providers: [ExchangeRateService, BaseRateResolver],
    bootstrap: [AppComponent]
})
export class AppModule {}
