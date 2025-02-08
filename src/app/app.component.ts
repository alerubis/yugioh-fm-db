import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

export interface NavigationItem {
    title: string;
    icon: string;
    url: string;
    children?: NavigationItem[];
}

@Component({
    selector: 'app-root',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatMenuModule,
        RouterModule,
    ],
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
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
        },
        {
            title: 'About',
            icon: 'info',
            url: 'about'
        },
    ];

}
