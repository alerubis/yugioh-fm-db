import { Routes } from '@angular/router';

export const initialRoute: string = 'home';

export const routes: Routes = [
    {
        path: 'cards',
        loadChildren: () => import('./cards/cards.routes').then(m => m.routes),
    },
    {
        path: 'duelist',
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
