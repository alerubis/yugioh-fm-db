import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { MobileService } from './shared/mobile.service';
import { MatToolbarModule } from '@angular/material/toolbar';

export interface NavigationItem {
    title: string;
    icon: string;
    url: string;
}

@Component({
    selector: 'app-root',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        MatToolbarModule,
        RouterModule,
    ],
    templateUrl: './app.component.html',
})
export class AppComponent {

    constructor(
        public mobileService: MobileService,
    ) {
    }

    navigation: NavigationItem[] = [
        {
            title: 'Home',
            icon: 'home',
            url: 'home'
        },
        {
            title: 'Cards',
            icon: 'style',
            url: 'cards'
        },
        {
            title: 'Duelists',
            icon: 'people',
            url: 'duelists'
        },
        {
            title: 'Fusions',
            icon: 'combine_columns',
            url: 'fusions'
        }
    ];

}
