import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExchangeRateService } from 'src/app/services';

@Injectable()
export class BaseRateResolver {
    constructor(private service: ExchangeRateService, private toastr: ToastrService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.service.getBaseRate().pipe(catchError(error => this.catchErrorFn(error)));
    }

    protected catchErrorFn(error: any) {
        if (error.error && error.error.message) {
            this.toastr.error(error.error.message);
        } else {
            this.toastr.error('Ошибка загрузки данных');
        }
        return throwError(error);
        // return of([]);
    }
}
