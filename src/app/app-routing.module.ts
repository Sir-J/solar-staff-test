import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultPageComponent } from 'app/components';
import { BaseRateResolver } from 'app/resolver';

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
