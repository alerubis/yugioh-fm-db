import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatToolbarModule,
        RouterModule,
    ],
    templateUrl: './home.component.html'
})
export class HomeComponent {

    darkMode: boolean = false;

    constructor(
        private titleService: Title,
    ) {
        this.titleService.setTitle('Home - Yu-Gi-Oh! Forbidden Memories Database');
    }

}
