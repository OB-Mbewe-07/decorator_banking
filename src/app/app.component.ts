import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParentComponent } from './Banking/parent.component/parent.component';
import { NavbarComponent } from "./Banking/nav.component/nav.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, ParentComponent, NavbarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'decorator_banking';
}
