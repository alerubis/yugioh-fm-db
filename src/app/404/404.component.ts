import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-404',
    templateUrl: './404.component.html',
    standalone: true,
    imports: [MatButton, RouterLink]
})
export class Error404Component {

    constructor(
        private titleService: Title,
    ) {
        this.titleService.setTitle('404 - Not found - Yu-Gi-Oh! Forbidden Memories Database');
    }

}
