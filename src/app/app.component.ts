import { MediaMatcher } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

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
        MatToolbar,
        RouterModule,
        NgClass,
    ],
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _media: MediaMatcher,
        private _router: Router,
    ) {
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
            icon: 'chevron_left',
            url: 'fusions'
        },
        {
            title: 'Other',
            icon: 'menu',
            url: 'other'
        }
    ];

}
