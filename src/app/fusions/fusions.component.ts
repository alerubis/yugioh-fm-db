import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import _ from 'lodash';
import { DataUtils } from '../shared/data-utils';
import { Card, Fusion } from '../shared/types';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

export class PossibleFusion {
    materials: Card[] = [];
    results: Card[] = [];

    getLastResult(): Card {
        return this.results[this.results.length - 1];
    }

}

@Component({
    selector: 'app-fusions',
    standalone: true,
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
    ],
    templateUrl: './fusions.component.html'
})
export class FusionsComponent {

    allCards: Card[] = DataUtils.getCards();
    selectedCards: Card[] = [];
    allFusions: Fusion[] = DataUtils.getFusions();
    possibleFusions: PossibleFusion[] = [];
    showIntermediateFusions = false;

    constructor(
        private _matDialog: MatDialog,
        private titleService: Title,
    ) {
        this.titleService.setTitle('Fusions - Yu-Gi-Oh! Forbidden Memories Database');
        this.loadPossibleFusions();
    }

    reset(): void {
        this.selectedCards = [];
        this.possibleFusions = [];
    }

    randomize(): void {
        this.selectedCards = _.sampleSize(this.allCards, 5);
        this.loadPossibleFusions();
        if (this.possibleFusions.length === 0) {
            this.randomize();
        }
    }

    handleCardClick(index: number): void {
        const randomCard = _.sample(this.allCards);
        if (randomCard) {
            this.selectedCards[index] = randomCard;
        }
        this.loadPossibleFusions();
    }

    countSelectedCards(): number {
        return this.selectedCards.filter(x => x).length;
    }

    // TODO make it recursive lazy mf!
    loadPossibleFusions() {
        this.possibleFusions = [];
        const cardsToCheck = _.uniqBy(this.selectedCards, x => x.CardId);
        for (const card1 of cardsToCheck) {
            const remainingCards1 = cardsToCheck.filter(x => x.CardId !== card1.CardId);
            for (const card2 of remainingCards1) {
                const fusion1 = this.allFusions.find(x => x.Material1 === card1.CardId && x.Material2 === card2.CardId);
                if (fusion1 && fusion1.cardResult) {
                    const possibleFusion1 = new PossibleFusion();
                    possibleFusion1.materials = [card1, card2];
                    possibleFusion1.results = [fusion1.cardResult];
                    this.possibleFusions.push(possibleFusion1);
                    const remainingCards2 = remainingCards1.filter(x => x.CardId !== card2.CardId);
                    for (const card3 of remainingCards2) {
                        const fusion2 = this.allFusions.find(x => x.Material1 === fusion1.cardResult?.CardId && x.Material2 === card3.CardId || x.Material1 === card3.CardId && x.Material2 === fusion1.cardResult?.CardId);
                        if (fusion2 && fusion2.cardResult) {
                            const possibleFusion2 = new PossibleFusion();
                            possibleFusion2.materials = [card1, card2, card3];
                            possibleFusion2.results = [fusion1.cardResult, fusion2.cardResult];
                            this.possibleFusions.push(possibleFusion2);
                            const remainingCards3 = remainingCards2.filter(x => x.CardId !== card3.CardId);
                            for (const card4 of remainingCards3) {
                                const fusion3 = this.allFusions.find(x => x.Material1 === fusion2.cardResult?.CardId && x.Material2 === card4.CardId || x.Material1 === card4.CardId && x.Material2 === fusion2.cardResult?.CardId);
                                if (fusion3 && fusion3.cardResult) {
                                    const possibleFusion3 = new PossibleFusion();
                                    possibleFusion3.materials = [card1, card2, card3, card4];
                                    possibleFusion3.results = [fusion1.cardResult, fusion2.cardResult, fusion3.cardResult];
                                    this.possibleFusions.push(possibleFusion3);
                                    const remainingCards4 = remainingCards3.filter(x => x.CardId !== card4.CardId);
                                    for (const card5 of remainingCards4) {
                                        const fusion4 = this.allFusions.find(x => x.Material1 === fusion3.cardResult?.CardId && x.Material2 === card5.CardId || x.Material1 === card5.CardId && x.Material2 === fusion3.cardResult?.CardId);
                                        if (fusion4 && fusion4.cardResult) {
                                            const possibleFusion4 = new PossibleFusion();
                                            possibleFusion4.materials = [card1, card2, card3, card4, card5];
                                            possibleFusion4.results = [fusion1.cardResult, fusion2.cardResult, fusion3.cardResult, fusion4.cardResult];
                                            this.possibleFusions.push(possibleFusion4);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.possibleFusions = _.orderBy(this.possibleFusions,
            [
                x => x.results[x.results.length - 1].Attack,
                x => x.materials.length,
                x => x.materials.map(y => y.Attack).reduce((a, b) => a + b, 0),
            ],
            [
                'desc',
                'asc',
                'asc',
            ]
        );
    }

}
