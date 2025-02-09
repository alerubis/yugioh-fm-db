import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
import { DataUtils } from '../shared/data-utils';
import { Card, Drop, EquipInfo } from '../shared/types';
import { CardsListComponent } from './cards-list/cards-list.component';

@Component({
    selector: 'app-cards',
    standalone: true,
    imports: [
        DecimalPipe,
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
        CardsListComponent,
    ],
    templateUrl: './cards.component.html'
})
export class CardsComponent implements OnInit {

    selectedCard: Card | undefined;
    drops: Drop[] = [];
    opponentsDecks: Drop[] = [];
    equips: EquipInfo[] = [];
    equipsInverse: EquipInfo[] = [];
    loading: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _matDialog: MatDialog,
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
                document.getElementsByClassName('mat-drawer-inner-container')[0].scrollTo(0, 0)
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
                }, 0);
            } else {
                this.selectedCard = undefined;
                this.titleService.setTitle('Cards - Yu-Gi-Oh! Forbidden Memories Database');
            }
        });
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
