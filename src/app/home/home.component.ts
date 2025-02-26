import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterModule,
    ],
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(
        private titleService: Title,
    ) {
        this.titleService.setTitle('Home - Yu-Gi-Oh! Forbidden Memories Database');
    }

}
