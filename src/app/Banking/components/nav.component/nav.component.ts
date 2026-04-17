import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'app-navbar',
    template: `
        <nav class='navbar'>
            <a routerLink="" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                My Account
            </a> |
            <a routerLink="/loan-request" routerLinkActive="active">
                Loan Request
            </a>
        </nav>
    `,
    imports: [RouterLink, RouterLinkActive]
})
export class NavbarComponent{

}