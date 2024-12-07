import { Routes } from '@angular/router';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './cards/cards.component';

export const routes: Routes = [
    {
        path: '',
        component: CardsComponent,
    },
    {
        path: ':id',
        component: CardComponent,
    }
];
