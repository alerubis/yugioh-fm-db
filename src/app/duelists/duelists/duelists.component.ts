import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import _ from 'lodash';
import { debounceTime } from 'rxjs';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { DataUtils } from '../../shared/data-utils';
import { Duelist } from '../../shared/types';

@Component({
    selector: 'app-duelists',
    standalone: true,
    imports: [
        BreadcrumbComponent,
        DecimalPipe,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSortModule,
        RouterLink,
        ReactiveFormsModule,
    ],
    templateUrl: './duelists.component.html'
})
export class DuelistsComponent implements OnInit {

    @ViewChild(MatSort) matSort: MatSort | undefined;
    filterControl = new FormControl();

    allDuelists: Duelist[] = DataUtils.getDuelists();
    duelists: Duelist[] = this.allDuelists;

    constructor(
        private titleService: Title,
    ) {
        this.titleService.setTitle('Duelists - Yu-Gi-Oh! Forbidden Memories Database');
    }

    ngOnInit(): void {
        this.filterControl.valueChanges
            .pipe(debounceTime(200))
            .subscribe(value => {
                this.filterDuelists();
            });
    }

    filterDuelists(): void {
        let filteredDuelists = this.allDuelists;
        if (this.filterControl && this.filterControl.value) {
            filteredDuelists = filteredDuelists.filter(x => x.Duelist.toLowerCase().includes(this.filterControl.value.toLowerCase()));
        }
        if (this.matSort) {
            filteredDuelists = _.orderBy(filteredDuelists, this.matSort.active, this.matSort.direction === 'asc' ? 'asc' : 'desc');
        }
        this.duelists = filteredDuelists;
    }

}
