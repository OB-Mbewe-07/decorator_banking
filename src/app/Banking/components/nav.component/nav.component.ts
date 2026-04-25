import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav.component.html',
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './nav.component.css',
})
export class NavbarComponent {}
