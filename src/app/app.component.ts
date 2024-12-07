import { MediaMatcher } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

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
        RouterModule,
        NgClass,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {

    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _media: MediaMatcher,
    ) {
        this.mobileQuery = this._media.matchMedia('(max-width: 639px)');
        this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
        this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    }

    navigation: NavigationGroup[] = [
        {
            title: 'Apps',
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
                    icon: 'style',
                    url: 'duelist'
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
