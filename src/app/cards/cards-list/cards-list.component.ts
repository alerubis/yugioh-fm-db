import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { RouterLink } from '@angular/router';
import _ from 'lodash';
import { debounceTime } from 'rxjs';
import { DataUtils } from '../../shared/data-utils';
import { MobileService } from '../../shared/mobile.service';
import { Card } from '../../shared/types';

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
        MatTooltipModule,
        MatSelectModule,
        MatSortModule,
        ReactiveFormsModule,
        RouterLink,
        NgClass,
    ],
    templateUrl: './cards-list.component.html'
})
export class CardsListComponent implements OnInit {

    allCards: Card[] = DataUtils.getCards();
    cards: Card[] = [];

    filterControl = new FormControl();
    filterByTypeControl = new FormControl();
    sortActive: string = 'CardId';
    sortDirection: 'asc' | 'desc' = 'asc';
    grayOutUnobtainableCards: boolean = false;

    @Input() navigate: boolean = false;
    @Output() cardSelected = new EventEmitter<Card>();

    constructor(
        public mobileService: MobileService,
    ) {

    }

    ngOnInit(): void {
        this.filterAndSortCards();

        this.filterControl.valueChanges
            .pipe(debounceTime(200))
            .subscribe(value => {
                this.filterAndSortCards();
            });

        this.filterByTypeControl.valueChanges
            .subscribe(value => {
                this.filterAndSortCards();
            });
    }

    filterAndSortCards(): void {
        let filteredCards = this.allCards;
        if (this.filterControl && this.filterControl.value) {
            filteredCards = filteredCards.filter(x => x.CardName.toLowerCase().includes(this.filterControl.value.toLowerCase()));
        }
        if (this.filterByTypeControl && this.filterByTypeControl.value && this.filterByTypeControl.value.length > 0) {
            filteredCards = filteredCards.filter(x => this.filterByTypeControl.value.some((y: string) => x.Type.includes(y)));
        }
        if (this.sortActive) {
            filteredCards = _.orderBy(filteredCards, this.sortActive, this.sortDirection);
        }
        this.cards = filteredCards;
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

}
