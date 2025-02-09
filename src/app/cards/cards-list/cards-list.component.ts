import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import _ from 'lodash';
import { debounceTime } from 'rxjs';
import { DataUtils } from '../../shared/data-utils';
import { Card } from '../../shared/types';
import { FilterCardsDialogComponent, FilterCardsDialogData } from '../filter-cards-dialog/filter-cards-dialog.component';

export class CardGroup {
    name: string = '';
    cards: Card[] = [];
}

@Component({
    selector: 'app-cards-list',
    standalone: true,
    imports: [
        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSidenavModule,
        MatSortModule,
        ReactiveFormsModule,
        RouterLink,
        NgClass,
        NgTemplateOutlet,
    ],
    templateUrl: './cards-list.component.html'
})
export class CardsListComponent implements OnInit {

    allCards: Card[] = DataUtils.getCards();
    cards: Card[] = this.allCards;
    cardGroups: CardGroup[] = [];

    filterControl = new FormControl();
    sortActive: string = 'CardId';
    sortDirection: 'asc' | 'desc' = 'asc';
    filterData = new FilterCardsDialogData();

    @Input() navigate: boolean = false;
    @Output() cardSelected = new EventEmitter<Card>();

    constructor(
        private _matDialog: MatDialog,
    ) {

    }

    ngOnInit(): void {
        this.filterControl.valueChanges
            .pipe(debounceTime(200))
            .subscribe(value => {
                this.filterAndSortCards();
            });
    }

    filterAndSortCards(): void {
        let filteredCards = this.allCards;
        if (this.filterControl && this.filterControl.value) {
            filteredCards = filteredCards.filter(x => x.CardName.toLowerCase().includes(this.filterControl.value.toLowerCase()));
        }
        if (this.sortActive) {
            filteredCards = _.orderBy(filteredCards, this.sortActive, this.sortDirection);
        }
        this.cards = filteredCards;
        this.loadCardGroups();
    }

    loadCardGroups(): void {
        this.cardGroups = [];
        if (this.sortActive === 'CardId') {
            if (this.sortDirection === 'asc') {
                const groups = [[1, 100], [101, 200], [201, 300], [301, 400], [401, 500], [501, 600], [601, 700], [701, 722]];
                for (const group of groups) {
                    const from = group[0];
                    const to = group[1];
                    this.cardGroups.push({
                        name: from + ' - ' + to,
                        cards: _.orderBy(this.cards.filter(x => x.CardId >= from && x.CardId <= to), x => x.CardId, 'asc'),
                    });
                }
            } else {
                const groups = [[722, 701], [700, 601], [600, 501], [500, 401], [400, 301], [300, 201], [200, 101], [100, 1]];
                for (const group of groups) {
                    const from = group[0];
                    const to = group[1];
                    this.cardGroups.push({
                        name: from + ' - ' + to,
                        cards: _.orderBy(this.cards.filter(x => x.CardId >= to && x.CardId <= from), x => x.CardId, 'desc'),
                    });
                }
            }
        } else if (this.sortActive === 'Attack') {
            let groups = _.orderBy(_.uniq(this.cards.map(x => x.Attack)));
            if (this.sortDirection === 'desc') {
                groups = groups.reverse();
            }
            for (const group of groups) {
                this.cardGroups.push({
                    name: group.toString(),
                    cards: _.orderBy(this.cards.filter(x => x.Attack === group), x => x.Defense, 'desc'),
                });
            }
        } else if (this.sortActive === 'Defense') {
            let groups = _.orderBy(_.uniq(this.cards.map(x => x.Defense)));
            if (this.sortDirection === 'desc') {
                groups = groups.reverse();
            }
            for (const group of groups) {
                this.cardGroups.push({
                    name: group.toString(),
                    cards: _.orderBy(this.cards.filter(x => x.Defense === group), x => x.Attack, 'desc'),
                });
            }
        } else if (this.sortActive === 'CardName') {
            let groups = _.uniq(this.cards.map(x => x.CardName[0].toUpperCase())).sort();
            if (this.sortDirection === 'desc') {
                groups = groups.reverse();
            }
            for (const group of groups) {
                this.cardGroups.push({
                    name: group,
                    cards: _.orderBy(this.cards.filter(x => x.CardName[0].toUpperCase() === group), x => x.Attack, 'desc'),
                });
            }
        } else if (this.sortActive === 'Type') {
            let groups = _.uniq(this.cards.map(x => x.Type)).sort();
            if (this.sortDirection === 'desc') {
                groups = groups.reverse();
            }
            for (const group of groups) {
                this.cardGroups.push({
                    name: group,
                    cards: _.orderBy(this.cards.filter(x => x.Type === group), x => x.Attack, 'desc'),
                });
            }
        }
    }

    handleSortChange(sort: string): void {
        if (sort === this.sortActive) {
            if (this.sortDirection === 'asc') {
                this.sortDirection = 'desc';
            } else {
                this.sortDirection = 'asc';
            }
        } else {
            if (sort === 'Attack' || sort === 'Defense') {
                this.sortDirection = 'desc';
            } else {
                this.sortDirection = 'asc';
            }
        }
        this.sortActive = sort;
        this.filterAndSortCards();
    }

    openFilterCardsDialog(): void {
        const dialogRef = this._matDialog.open(FilterCardsDialogComponent, {
            data: this.filterData,
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.filterData = result;
                this.filterAndSortCards();
            }
        });
    }

}
