import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { MessageBoxComponent } from '../../shared/components/message-box/message-box.component';
import { DataUtils } from '../../shared/data-utils';
import { Duelist } from '../../shared/types';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-duelist',
    standalone: true,
    imports: [
        RouterLink,
        MatIcon,
        MatIconButton,
        BreadcrumbComponent,
        MessageBoxComponent,
        DecimalPipe
    ],
    templateUrl: './duelist.component.html'
})
export class DuelistComponent implements OnInit {

    duelist?: Duelist;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private titleService: Title,
    ) {
        this.titleService.setTitle('? - Duelists - Yu-Gi-Oh! Forbidden Memories Database');
    }

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.duelist = DataUtils.getDuelistFromId(params.get('id'));
            this.titleService.setTitle(this.duelist?.Duelist + ' - Duelists - Yu-Gi-Oh! Forbidden Memories Database');
        });
    }

}
