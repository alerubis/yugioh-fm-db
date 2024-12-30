import { Routes } from '@angular/router';
import { DuelistsComponent } from './duelists.component';

export const routes: Routes = [
    {
        path: '',
        component: DuelistsComponent,
        data: { shouldReuse: true },
    },
    {
        path: ':id',
        component: DuelistsComponent,
        data: { shouldReuse: true },
    }
];
