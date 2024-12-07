import { Routes } from '@angular/router';
import { DuelistComponent } from './duelist/duelist.component';
import { DuelistsComponent } from './duelists/duelists.component';

export const routes: Routes = [
    {
        path: '',
        component: DuelistsComponent,
    },
    {
        path: ':id',
        component: DuelistComponent,
    }
];
