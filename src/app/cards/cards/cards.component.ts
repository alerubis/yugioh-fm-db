import { Component } from '@angular/core';
import _ from 'lodash';
import { DataUtils } from '../../shared/data-utils';
import { Card } from '../../shared/types';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';

@Component({
    selector: 'app-cards',
    standalone: true,
    imports: [
        RouterLink,
        BreadcrumbComponent
    ],
    templateUrl: './cards.component.html'
})
export class CardsComponent {

    cards: Card[] = DataUtils.getCards();
    selectedCard?: Card = this.cards[0];

    getCardsChunks(): Card[][] {
        const chunks = _.chunk(this.cards, 100);
        return chunks;
    }

}
