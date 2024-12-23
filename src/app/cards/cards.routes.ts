import { Routes } from '@angular/router';
import { CardsComponent } from './cards.component';

export const routes: Routes = [
    {
        path: '',
        component: CardsComponent,
        data: { shouldReuse: true },
    },
    {
        path: ':id',
        component: CardsComponent,
        data: { shouldReuse: true },
    }
];
