import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-404',
    templateUrl: './404.component.html',
    standalone: true,
    imports: [MatButton, RouterLink]
})
export class Error404Component {

}
