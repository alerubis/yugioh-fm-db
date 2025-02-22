import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, Injectable, OnDestroy } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class MobileService implements OnDestroy {

    private _mobileQuery: MediaQueryList;
    private _mobileQueryLg: MediaQueryList;
    private _mobileQueryListener: () => void;

    constructor(
        private _media: MediaMatcher,
    ) {
        this._mobileQuery = this._media.matchMedia('(max-width: 767px)');
        this._mobileQueryLg = this._media.matchMedia('(max-width: 1023px)');
        this._mobileQueryListener = () => {};
        this._mobileQuery.addEventListener('change', this._mobileQueryListener);
    }

    ngOnDestroy(): void {
        this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
    }

    isMobile(): boolean {
        return this._mobileQuery.matches;
    }

    isTablet(): boolean {
        return this._mobileQueryLg.matches;
    }

}
