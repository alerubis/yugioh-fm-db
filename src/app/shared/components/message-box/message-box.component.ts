import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-message-box',
    templateUrl: './message-box.component.html',
    standalone: true,
    imports: [
        MatIcon,
        NgClass,
    ]
})
export class MessageBoxComponent {

    @Input({ required: true }) type: 'info' | 'warning' | 'error' | undefined;
    @Input({ required: true }) message: string | undefined;

    constructor() {

    }

    getTextClass(): string {
        switch (this.type) {
            case 'info': return 'text-blue-700';
            case 'warning': return 'text-amber-700';
            case 'error': return 'text-red-700';
            default: return 'text-gray-700';
        }
    }

    getBgClass(): string {
        switch (this.type) {
            case 'info': return 'bg-blue-100';
            case 'warning': return 'bg-amber-100';
            case 'error': return 'bg-red-100';
            default: return 'bg-gray-100';
        }
    }

    getBorderClass(): string {
        switch (this.type) {
            case 'info': return 'border-blue-700';
            case 'warning': return 'border-amber-700';
            case 'error': return 'border-red-700';
            default: return 'border-gray-700';
        }
    }

}
