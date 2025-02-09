import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Card } from '../../shared/types';
import { CardsListComponent } from '../cards-list/cards-list.component';

@Component({
    selector: 'app-search-card-dialog',
    templateUrl: './search-card-dialog.component.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        CardsListComponent,
    ]
})
export class SearchCardDialogComponent {

    constructor(
        private _dialogRef: MatDialogRef<SearchCardDialogComponent>,
    ) {
    }

    //#region Actions
    cancel(): void {
        this._dialogRef.close(false);
    }

    selectCard(card: Card): void {
        this._dialogRef.close(card);
    }
    //#endregion

}
