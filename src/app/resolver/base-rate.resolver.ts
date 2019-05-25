import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExchangeRateService } from 'src/app/services';
import { FilterDto } from 'src/app/models/classes';

@Injectable()
export class BaseRateResolver {
    constructor(private service: ExchangeRateService, private toastr: ToastrService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.service.getBaseRate('EUR', new Date()).pipe(catchError(error => this.catchErrorFn(error)));
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
