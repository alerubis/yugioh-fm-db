import { DecimalPipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule, Sort } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import _ from 'lodash';
import { DataUtils } from '../../shared/data-utils';
import { Card, Drop, EquipInfo } from '../../shared/types';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
        RouterLink,
        MatButtonModule,
        MatIconModule,
        DecimalPipe,
        MatSortModule,
    ],
    templateUrl: './card.component.html',
})
export class CardComponent implements OnChanges {

    @Input() card?: Card;

    drops: Drop[] = [];
    opponentsDecks: Drop[] = [];
    equips: EquipInfo[] = [];
    equipsInverse: EquipInfo[] = [];

    constructor(
        private titleService: Title,
    ) {
        this.titleService.setTitle('? - Cards - Yu-Gi-Oh! Forbidden Memories Database');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.card) {
            this.titleService.setTitle((this.card.getFullName() || '?') + ' - Cards - Yu-Gi-Oh! Forbidden Memories Database');
            this.drops = DataUtils.getDropsForCard(this.card.CardId);
            this.opponentsDecks = DataUtils.getOpponentsDecksForCard(this.card.CardId);
            this.equips = DataUtils.getEquipInfosForCard(this.card.CardId);
            this.equipsInverse = DataUtils.getEquipInfosForCardInverse(this.card.CardId);
        }
    }

    filterDrops(sort: Sort): void {
        this.drops = _.orderBy(this.drops, sort.active, sort.direction === 'asc' ? 'asc' : 'desc');
    }

    filterOpponentDecks(sort: Sort): void {
        this.opponentsDecks = _.orderBy(this.opponentsDecks, sort.active, sort.direction === 'asc' ? 'asc' : 'desc');
    }

    sortEquips(sort: Sort): void {
        this.equips = _.orderBy(this.equips, sort.active, sort.direction === 'asc' ? 'asc' : 'desc');
    }

    sortEquipsInverse(sort: Sort): void {
        this.equipsInverse = _.orderBy(this.equipsInverse, sort.active, sort.direction === 'asc' ? 'asc' : 'desc');
    }

}
