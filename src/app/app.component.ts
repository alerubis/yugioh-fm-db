import { MediaMatcher } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

export interface NavigationGroup {
    title: string;
    items: NavigationItem[];
}

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

    @ViewChild(MatSidenavContent) sidenavContent!: MatSidenavContent;

    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _media: MediaMatcher,
        private _router: Router,
    ) {
        this.mobileQuery = this._media.matchMedia('(max-width: 639px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
        this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    }

    ngOnInit(): void {
        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.sidenavContent.scrollTo({ top: 0, behavior: 'instant' });
            }
        });
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    }

    navigation: NavigationGroup[] = [
        {
            title: 'Database',
            items: [
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
                }
            ]
        },
        {
            title: 'Tools',
            items: [
                {
                    title: 'Initial deck simulator',
                    icon: 'home',
                    url: 'initial-deck-simulator'
                },
                {
                    title: 'Duelist deck simulator',
                    icon: 'home',
                    url: 'duelist-deck-simulator'
                }
            ]
        },
        {
            title: 'Other',
            items: [
                {
                    title: 'Settings',
                    icon: 'settings',
                    url: 'settings'
                },
                {
                    title: 'Info',
                    icon: 'info',
                    url: 'info'
                }
            ]
        }
    ];

}
