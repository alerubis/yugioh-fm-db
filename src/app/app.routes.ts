import { ActivatedRouteSnapshot, BaseRouteReuseStrategy, Routes } from '@angular/router';

export const initialRoute: string = 'home';

export const routes: Routes = [
    {
        path: 'cards',
        loadChildren: () => import('./cards/cards.routes').then(m => m.routes),
    },
    {
        path: 'duelists',
        loadChildren: () => import('./duelists/duelists.routes').then(m => m.routes),
    },
    {
        path: '',
        redirectTo: initialRoute,
        pathMatch: 'full'
    },
    {
        path: '**',
        loadChildren: () => import('./404/404.routes').then(m => m.routes),
    },
];


export class CustomRouteReuseStrategy extends BaseRouteReuseStrategy {
    override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        if (future.data?.['shouldReuse']) {
            return true;
        }
        return super.shouldReuseRoute(future, curr);
    }
}
