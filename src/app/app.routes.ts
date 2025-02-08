import { ActivatedRouteSnapshot, BaseRouteReuseStrategy, Routes } from '@angular/router';

export const initialRoute: string = 'home';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then(m => m.routes),
    },
    {
        path: 'cards',
        loadChildren: () => import('./cards/cards.routes').then(m => m.routes),
    },
    {
        path: 'duelists',
        loadChildren: () => import('./duelists/duelists.routes').then(m => m.routes),
    },
    {
        path: 'fusions',
        loadChildren: () => import('./fusions/fusions.routes').then(m => m.routes),
    },
    {
        path: 'about',
        loadChildren: () => import('./about/about.routes').then(m => m.routes),
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
