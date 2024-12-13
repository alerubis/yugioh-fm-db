import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { DataUtils } from '../../shared/data-utils';
import { Duelist, Drop, EquipInfo } from '../../shared/types';

@Component({
    selector: 'app-duelist',
    standalone: true,
    imports: [
        RouterLink,
        MatButtonModule,
        MatIconModule,
        DecimalPipe,
        BreadcrumbComponent
    ],
    templateUrl: './duelist.component.html',
})
export class DuelistComponent implements OnInit {

    duelist?: Duelist;
    drops: Drop[] = [];
    decks: Drop[] = [];

    constructor(
        private _activatedRoute: ActivatedRoute,
        private titleService: Title,
    ) {
        this.titleService.setTitle('? - Duelists - Yu-Gi-Oh! Forbidden Memories Database');
    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.duelist = DataUtils.getDuelistFromId(params.get('id'));
            this.titleService.setTitle((this.duelist?.Duelist || '?') + ' - Duelists - Yu-Gi-Oh! Forbidden Memories Database');
            this.drops = DataUtils.getDropsForDuelist(params.get('id'));
            this.decks = DataUtils.getDecksForDuelist(params.get('id'));
        });
    }

}
