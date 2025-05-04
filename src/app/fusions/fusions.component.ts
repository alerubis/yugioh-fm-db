import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';
import _ from 'lodash';
import { SearchCardDialogComponent } from '../cards/search-card-dialog/search-card-dialog.component';
import { DataUtils } from '../shared/data-utils';
import { Card, Fusion } from '../shared/types';
import { LanguageService } from '../shared/language.service';

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
        MatFormFieldModule,
        MatTooltipModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    templateUrl: './fusions.component.html'
})
export class FusionsComponent {

    allCards: Card[] = DataUtils.getCards();
    selectedCards: (Card | null)[] = [null, null, null, null, null];
    selectedCardsIds: FormControl[] = [new FormControl(), new FormControl(), new FormControl(), new FormControl(), new FormControl()];
    allFusions: Fusion[] = DataUtils.getFusions();
    possibleFusions: PossibleFusion[] = [];
    showIntermediateFusions = false;

    constructor(
        private _matDialog: MatDialog,
        private titleService: Title,
        public languageService: LanguageService,
    ) {
        this.titleService.setTitle('Fusions - Yu-Gi-Oh! Forbidden Memories Database');
        for (const formControl of this.selectedCardsIds) {
            formControl.valueChanges
                .subscribe(value => {
                    const card = DataUtils.getCardFromId(value);
                    if (card) {
                        this.selectedCards[this.selectedCardsIds.indexOf(formControl)] = card;
                        this.loadPossibleFusions();
                    } else {
                        this.selectedCards[this.selectedCardsIds.indexOf(formControl)] = null;
                        this.loadPossibleFusions();
                    }
                });
        }
    }

    reset(): void {
        this.selectedCards = [];
        for (const formControl of this.selectedCardsIds) {
            formControl.setValue('');
        }
        this.possibleFusions = [];
    }

    randomize(): void {
        this.selectedCards = _.sampleSize(this.allCards, 5);
        for (let i = 0; i < this.selectedCards.length; i++) {
            this.selectedCardsIds[i].setValue(this.selectedCards[i]?.getCardIdAsString());
        }
        this.loadPossibleFusions();
        if (this.possibleFusions.length === 0) {
            this.randomize();
        }
    }

    handleCardClick(index: number): void {
        this._matDialog.open(SearchCardDialogComponent, {
            width: '100vw',
            maxWidth: '1280px',
        }).afterClosed().subscribe((card: Card) => {
            if (card) {
                this.selectedCards[index] = card;
                this.selectedCardsIds[index].setValue(card.getCardIdAsString());
                this.loadPossibleFusions();
            }
        });
    }

    countSelectedCards(): number {
        return this.selectedCards.filter(x => x).length;
    }

    // TODO make it recursive lazy mf!
    loadPossibleFusions() {
        this.possibleFusions = [];
        const cardsToCheck: Card[] = this.selectedCards.filter(x => x) as Card[];
        for (let i1 = 0; i1 < cardsToCheck.length; i1++) {
            const card1 = cardsToCheck[i1];
            const remainingCards1 = cardsToCheck.filter((card, index) => index !== i1);
            for (let i2 = 0; i2 < remainingCards1.length; i2++) {
                const card2 = remainingCards1[i2];
                const fusion1 = this.allFusions.find(x => x.Material1 === card1.CardId && x.Material2 === card2.CardId || x.Material1 === card2.CardId && x.Material2 === card1.CardId);
                if (fusion1 && fusion1.cardResult) {
                    const possibleFusion1 = new PossibleFusion();
                    possibleFusion1.materials = [card1, card2];
                    possibleFusion1.results = [fusion1.cardResult];
                    this.possibleFusions.push(possibleFusion1);
                    const remainingCards2 = remainingCards1.filter((card, index) => index !== i2);
                    for (let i3 = 0; i3 < remainingCards2.length; i3++) {
                        const card3 = remainingCards2[i3];
                        const fusion2 = this.allFusions.find(x => x.Material1 === fusion1.cardResult?.CardId && x.Material2 === card3.CardId || x.Material1 === card3.CardId && x.Material2 === fusion1.cardResult?.CardId);
                        if (fusion2 && fusion2.cardResult) {
                            const possibleFusion2 = new PossibleFusion();
                            possibleFusion2.materials = [card1, card2, card3];
                            possibleFusion2.results = [fusion1.cardResult, fusion2.cardResult];
                            this.possibleFusions.push(possibleFusion2);
                            const remainingCards3 = remainingCards2.filter((card, index) => index !== i3);
                            for (let i4 = 0; i4 < remainingCards3.length; i4++) {
                                const card4 = remainingCards3[i4];
                                const fusion3 = this.allFusions.find(x => x.Material1 === fusion2.cardResult?.CardId && x.Material2 === card4.CardId || x.Material1 === card4.CardId && x.Material2 === fusion2.cardResult?.CardId);
                                if (fusion3 && fusion3.cardResult) {
                                    const possibleFusion3 = new PossibleFusion();
                                    possibleFusion3.materials = [card1, card2, card3, card4];
                                    possibleFusion3.results = [fusion1.cardResult, fusion2.cardResult, fusion3.cardResult];
                                    this.possibleFusions.push(possibleFusion3);
                                    const remainingCards4 = remainingCards3.filter((card, index) => index !== i4);
                                    for (let i5 = 0; i5 < remainingCards4.length; i5++) {
                                        const card5 = remainingCards4[i5];
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
        this.possibleFusions = _.uniqWith(this.possibleFusions, (a, b) => {
            const a1 = a.materials[0]?.CardId + '-' + a.materials[1]?.CardId + '-' + a.materials[2]?.CardId + '-' + a.materials[3]?.CardId + '-' + a.materials[4]?.CardId;
            const a2 = a.materials[1]?.CardId + '-' + a.materials[0]?.CardId + '-' + a.materials[2]?.CardId + '-' + a.materials[3]?.CardId + '-' + a.materials[4]?.CardId;
            const b1 = b.materials[0]?.CardId + '-' + b.materials[1]?.CardId + '-' + b.materials[2]?.CardId + '-' + b.materials[3]?.CardId + '-' + b.materials[4]?.CardId;
            const b2 = b.materials[1]?.CardId + '-' + b.materials[0]?.CardId + '-' + b.materials[2]?.CardId + '-' + b.materials[3]?.CardId + '-' + b.materials[4]?.CardId;
            if (a1 === b1 || a1 === b2 || a2 === b1 || a2 === b2) {
                return true;
            } else {
                return false;
            }
        });
        this.possibleFusions = _.orderBy(this.possibleFusions,
            [
                x => x.results[x.results.length - 1].Attack,
                x => x.materials.length,
                x => x.materials.map(y => y.Attack).reduce((a, b) => a + b, 0),
                x => x.materials[0]?.Attack,
                x => x.materials[1]?.Attack,
                x => x.materials[2]?.Attack,
                x => x.materials[3]?.Attack,
                x => x.materials[4]?.Attack,
            ],
            [
                'desc',
                'asc',
                'asc',
                'asc',
                'asc',
                'asc',
                'asc',
                'asc',
            ]
        );
    }

}
