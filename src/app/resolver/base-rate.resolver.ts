import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ExchangeRateService } from 'app/services';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BaseRateResolver {
    constructor(private service: ExchangeRateService, private toastr: ToastrService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.service.getBaseRate('EUR', new Date()).pipe(catchError(error => this.catchErrorFn(error)));
    }

    protected catchErrorFn(error: any) {
        this.toastr.error('Ошибка загрузки данных');
        return throwError(error);
        // return of([]);
    }
}
