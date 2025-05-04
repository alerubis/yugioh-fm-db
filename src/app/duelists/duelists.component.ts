import { DecimalPipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import _ from 'lodash';
import { debounceTime } from 'rxjs';
import { DataUtils } from '../shared/data-utils';
import { Drop, Duelist } from '../shared/types';
import { MobileService } from '../shared/mobile.service';
import { MatSelectModule } from '@angular/material/select';
import { LanguageService } from '../shared/language.service';

@Component({
    selector: 'app-duelists',
    standalone: true,
    imports: [
        DecimalPipe,
        MatButtonModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        MatSortModule,
        ReactiveFormsModule,
        RouterLink,
        NgClass,
    ],
    templateUrl: './duelists.component.html'
})
export class DuelistsComponent implements OnInit {

    allDuelists: Duelist[] = DataUtils.getDuelists();
    duelists: Duelist[] = this.allDuelists;

    filterControl = new FormControl();
    sortActive: string = 'DuelistId';
    sortDirection: 'asc' | 'desc' = 'asc';

    filterDropsByRankControl = new FormControl();
    sortDropsActive: string = 'card.Attack';
    sortDropsDirection: 'asc' | 'desc' = 'desc';

    selectedDuelist: Duelist | undefined;
    allDrops: Drop[] = [];
    drops: Drop[] = [];
    decks: Drop[] = [];
    loading: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _matDialog: MatDialog,
        private titleService: Title,
        public mobileService: MobileService,
        public languageService: LanguageService,
    ) {
        this.titleService.setTitle('Duelists - Yu-Gi-Oh! Forbidden Memories Database');
    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const duelistId = params.get('id');
            if (duelistId) {
                this.selectedDuelist = DataUtils.getDuelistFromId(params.get('id'));
                this.titleService.setTitle((this.selectedDuelist?.Duelist || '?') + ' - Duelists - Yu-Gi-Oh! Forbidden Memories Database');
                document.getElementsByClassName('mat-drawer-inner-container')[0].scrollTo(0, 0)
                this.loading = true;
                this.allDrops = [];
                this.filterAndSortDrops();
                this.decks = [];
                setTimeout(() => {
                    this.allDrops = DataUtils.getDropsForDuelist(duelistId);
                    this.filterAndSortDrops();
                    this.decks = DataUtils.getDecksForDuelist(duelistId);
                    this.loading = false;
                }, 0);
            } else {
                this.selectedDuelist = undefined;
                this.titleService.setTitle('Duelists - Yu-Gi-Oh! Forbidden Memories Database');
            }
        });

        this.filterControl.valueChanges
            .pipe(debounceTime(200))
            .subscribe(value => {
                this.filterAndSortDuelists();
            });

        this.filterDropsByRankControl.valueChanges
            .pipe(debounceTime(200))
            .subscribe(value => {
                this.filterAndSortDrops();
            });
    }

    filterAndSortDuelists(): void {
        let filteredCards = this.allDuelists;
        if (this.filterControl && this.filterControl.value) {
            filteredCards = filteredCards.filter(x => x.Duelist.toLowerCase().includes(this.filterControl.value.toLowerCase()));
        }
        if (this.sortActive) {
            filteredCards = _.orderBy(filteredCards, this.sortActive, this.sortDirection);
        }
        this.duelists = filteredCards;
    }

    handleSortChange(sort: string): void {
        if (sort === this.sortActive) {
            if (this.sortDirection === 'asc') {
                this.sortDirection = 'desc';
            } else {
                this.sortDirection = 'asc';
            }
        } else {
            this.sortDirection = 'asc';
        }
        this.sortActive = sort;
        this.filterAndSortDuelists();
    }

    handleBackdropClick(): void {
        this.selectedDuelist = undefined;
    }

    sortDecks(sort: Sort): void {
        this.decks = _.orderBy(this.decks, sort.active, sort.direction === 'asc' ? 'asc' : 'desc');
    }

    handleSortDropsChange(sort: string): void {
        if (sort === this.sortDropsActive) {
            if (this.sortDropsDirection === 'asc') {
                this.sortDropsDirection = 'desc';
            } else {
                this.sortDropsDirection = 'asc';
            }
        } else {
            this.sortDropsDirection = 'desc';
        }
        this.sortDropsActive = sort;
        this.filterAndSortDrops();
    }

    filterAndSortDrops(): void {
        let filteredDrops = this.allDrops;
        if (this.filterDropsByRankControl && this.filterDropsByRankControl.value && this.filterDropsByRankControl.value.length > 0) {
            filteredDrops = filteredDrops.filter(x => this.filterDropsByRankControl.value.includes(x.PoolType));
        }
        if (this.sortDropsActive) {
            filteredDrops = _.orderBy(filteredDrops, this.sortDropsActive, this.sortDropsDirection === 'asc' ? 'asc' : 'desc');
        }
        this.drops = filteredDrops;
    }

}
