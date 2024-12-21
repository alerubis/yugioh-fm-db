import { DecimalPipe, NgClass } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import _ from 'lodash';
import { debounceTime } from 'rxjs';
import { DataUtils } from '../../shared/data-utils';
import { Card, Drop, EquipInfo } from '../../shared/types';
import { CardComponent } from '../card/card.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
    selector: 'app-cards',
    standalone: true,
    imports: [
        DecimalPipe,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSortModule,
        RouterLink,
        ReactiveFormsModule,
        NgClass,
        MatMenuModule,
        MatSidenavModule,
        CardComponent,
        MatExpansionModule,
        MatProgressBarModule,
    ],
    templateUrl: './cards.component.html'
})
export class CardsComponent implements OnInit {

    @ViewChild(MatSort) matSort: MatSort | undefined;
    filterControl = new FormControl();

    allCards: Card[] = DataUtils.getCards();
    cards: Card[] = this.allCards;

    selectedCard: Card | undefined;
    drops: Drop[] = [];
    opponentsDecks: Drop[] = [];
    equips: EquipInfo[] = [];
    equipsInverse: EquipInfo[] = [];
    loading: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private titleService: Title,
    ) {
        this.titleService.setTitle('Cards - Yu-Gi-Oh! Forbidden Memories Database');
    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            const cardId = params.get('id');
            if (cardId) {
                this.selectedCard = DataUtils.getCardFromId(params.get('id'));
                this.titleService.setTitle((this.selectedCard?.getFullName() || '?') + ' - Cards - Yu-Gi-Oh! Forbidden Memories Database');
                this.loading = true;
                this.drops = [];
                this.opponentsDecks = [];
                this.equips = [];
                this.equipsInverse = [];
                setTimeout(() => {
                    this.drops = DataUtils.getDropsForCard(cardId);
                    this.opponentsDecks = DataUtils.getOpponentsDecksForCard(cardId);
                    this.equips = DataUtils.getEquipInfosForCard(cardId);
                    this.equipsInverse = DataUtils.getEquipInfosForCardInverse(cardId);
                    this.loading = false;
                }, 400);
            } else {
                this.selectedCard = undefined;
            }
        });

        this.filterControl.valueChanges
            .pipe(debounceTime(200))
            .subscribe(value => {
                this.filterCards();
            });
    }

    filterCards(): void {
        let filteredCards = this.allCards;
        if (this.filterControl && this.filterControl.value) {
            filteredCards = filteredCards.filter(x => x.CardName.toLowerCase().includes(this.filterControl.value.toLowerCase()));
        }
        if (this.matSort) {
            filteredCards = _.orderBy(filteredCards, this.matSort.active, this.matSort.direction === 'asc' ? 'asc' : 'desc');
        }
        this.cards = filteredCards;
    }

    handleBackdropClick(): void {
        this.selectedCard = undefined;
    }

    sortDrops(sort: Sort): void {
        this.drops = _.orderBy(this.drops, sort.active, sort.direction === 'asc' ? 'asc' : 'desc');
    }

    sortOpponentDecks(sort: Sort): void {
        this.opponentsDecks = _.orderBy(this.opponentsDecks, sort.active, sort.direction === 'asc' ? 'asc' : 'desc');
    }

    sortEquips(sort: Sort): void {
        this.equips = _.orderBy(this.equips, sort.active, sort.direction === 'asc' ? 'asc' : 'desc');
    }

    sortEquipsInverse(sort: Sort): void {
        this.equipsInverse = _.orderBy(this.equipsInverse, sort.active, sort.direction === 'asc' ? 'asc' : 'desc');
    }

}
