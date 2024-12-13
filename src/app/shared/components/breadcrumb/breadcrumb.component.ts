import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
    text: string | undefined;
    route: any;
    icon?: string;
    img?: string;
}

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    standalone: true,
    imports: [
        MatIcon,
        RouterLink,
        NgClass,
    ]
})
export class BreadcrumbComponent {

    @Input({ required: true }) section: string | undefined;
    @Input({ required: true }) items: BreadcrumbItem[] = [];

    constructor() {

    }

}
