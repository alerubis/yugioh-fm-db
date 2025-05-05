import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MobileService implements OnDestroy {

    private mobileQuery = '(max-width: 767px)';
    private tabletQuery = '(max-width: 1023px)';

    private _isMobile$ = new BehaviorSubject<boolean>(false);
    private _isTablet$ = new BehaviorSubject<boolean>(false);

    private subscriptions = new Subscription();

    constructor(
        private breakpointObserver: BreakpointObserver,
    ) {
        this.subscriptions.add(
            this.breakpointObserver.observe(this.mobileQuery).subscribe((state: BreakpointState) => {
                this._isMobile$.next(state.matches);
            })
        );

        this.subscriptions.add(
            this.breakpointObserver.observe(this.tabletQuery).subscribe((state: BreakpointState) => {
                this._isTablet$.next(state.matches);
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    isMobile(): boolean {
        return this._isMobile$.value;
    }

    isTablet(): boolean {
        return this._isTablet$.value;
    }

    isMobile$() {
        return this._isMobile$.asObservable();
    }

    isTablet$() {
        return this._isTablet$.asObservable();
    }

}
