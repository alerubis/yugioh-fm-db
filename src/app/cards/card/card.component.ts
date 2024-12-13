import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
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
        BreadcrumbComponent
    ],
    templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {

    card?: Card;
    drops: Drop[] = [];
    opponentsDecks: Drop[] = [];
    equipInfos: EquipInfo[] = [];
    equipInfosInverse: EquipInfo[] = [];

    constructor(
        private _activatedRoute: ActivatedRoute,
        private titleService: Title,
    ) {
        this.titleService.setTitle('? - Cards - Yu-Gi-Oh! Forbidden Memories Database');
    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.card = DataUtils.getCardFromId(params.get('id'));
            this.titleService.setTitle((this.card?.getFullName() || '?') + ' - Cards - Yu-Gi-Oh! Forbidden Memories Database');
            this.drops = DataUtils.getDropsForCard(params.get('id'));
            this.opponentsDecks = DataUtils.getOpponentsDecksForCard(params.get('id'));
            this.equipInfos = DataUtils.getEquipInfosForCard(params.get('id'));
            this.equipInfosInverse = DataUtils.getEquipInfosForCardInverse(params.get('id'));
        });
    }

}
