import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { MessageBoxComponent } from '../../shared/components/message-box/message-box.component';
import { DataUtils } from '../../shared/data-utils';
import { Card, Drop, EquipInfo } from '../../shared/types';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MatIconButton } from '@angular/material/button';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [
        RouterLink,
        MatIcon,
        MatIconButton,
        BreadcrumbComponent,
        MessageBoxComponent,
        DecimalPipe
    ],
    templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {

    card?: Card;
    drops: Drop[] = [];
    opponentsDecks: Drop[] = [];
    equipInfos: EquipInfo[] = [];

    constructor(
        private _activatedRoute: ActivatedRoute,
    ) {

    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.card = DataUtils.getCardFromId(params.get('id'));
            this.drops = DataUtils.getDropsForCard(params.get('id'));
            this.opponentsDecks = DataUtils.getDropsForCard(params.get('id'));
            this.equipInfos = DataUtils.getEquipInfosForCard(params.get('id'));
        });
    }

}
