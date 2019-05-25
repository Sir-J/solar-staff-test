import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultPageComponent } from 'src/app/components';
import { BaseRateResolver } from 'src/app/resolver';

export const routes: Routes = [
    {
        path: '',
        component: DefaultPageComponent,
        resolve: {
            baseRate: BaseRateResolver
        }
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
