import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultPageComponent } from './components';
import { LazyRoutePreloadingStrategy } from './lazy-route.preloading.strategy';
import { BaseRateResolver } from 'src/app/resolver';

export const appRoutes: Routes = [
    {
        path: '',
        component: DefaultPageComponent,
        resolve: {
            rates: BaseRateResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: LazyRoutePreloadingStrategy, paramsInheritanceStrategy: 'always' })],
    exports: [RouterModule],
    providers: [LazyRoutePreloadingStrategy]
})
export class AppRouterModule {}
