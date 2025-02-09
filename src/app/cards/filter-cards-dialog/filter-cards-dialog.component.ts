import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

export class FilterCardsDialogData {
    grayOutUnobtainableCards: boolean;
    groupByActiveSort: boolean;

    constructor(value?: any) {
        this.grayOutUnobtainableCards = value?.grayOutUnobtainableCards || false;
        this.groupByActiveSort = value?.groupByActiveSort || false;
    }
}

@Component({
    selector: 'app-filter-cards-dialog',
    templateUrl: './filter-cards-dialog.component.html',
    standalone: true,
    imports: [
        DragDropModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatCheckboxModule,
        FormsModule,
    ]
})
export class FilterCardsDialogComponent {

    data: FilterCardsDialogData = new FilterCardsDialogData();

    constructor(
        @Inject(MAT_DIALOG_DATA) private _data: FilterCardsDialogData,
        private _dialogRef: MatDialogRef<FilterCardsDialogComponent>,
    ) {
        if (this._data) {
            this.data = new FilterCardsDialogData(this._data);
        }
    }

    //#region Actions
    cancel(): void {
        this._dialogRef.close(false);
    }

    confirm(): void {
        this._dialogRef.close(this.data);
    }
    //#endregion

}
