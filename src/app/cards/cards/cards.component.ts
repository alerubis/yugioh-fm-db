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
import { Card } from '../../shared/types';

@Component({
    selector: 'app-cards',
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
    templateUrl: './cards.component.html'
})
export class CardsComponent implements OnInit {

    @ViewChild(MatSort) matSort: MatSort | undefined;
    filterControl = new FormControl();

    allCards: Card[] = DataUtils.getCards();
    cards: Card[] = this.allCards;

    constructor(
        private titleService: Title,
    ) {
        this.titleService.setTitle('Cards - Yu-Gi-Oh! Forbidden Memories Database');
    }

    ngOnInit(): void {
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

}
