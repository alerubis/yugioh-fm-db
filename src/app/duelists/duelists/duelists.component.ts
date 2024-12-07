import { Component } from '@angular/core';
import _ from 'lodash';
import { DataUtils } from '../../shared/data-utils';
import { Duelist } from '../../shared/types';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-duelists',
    standalone: true,
    imports: [
        RouterLink,
        BreadcrumbComponent
    ],
    templateUrl: './duelists.component.html'
})
export class DuelistsComponent {

    duelists: Duelist[] = DataUtils.getDuelists();

    constructor(private titleService: Title) {
        this.titleService.setTitle('Duelists - Yu-Gi-Oh! Forbidden Memories Database');
    }

}
