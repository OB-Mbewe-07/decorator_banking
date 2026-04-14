import { Routes } from '@angular/router';
import { ParentComponent } from './Banking/parent.component/parent.component';
import {LobbyPageComponent} from './Banking/lobby.component/lobby.component'

export const routes: Routes = [
    {
        path: '/',
        component: ParentComponent,
        title: 'All accounts'
    },
    {
        path: '/LoanRequest', 
        component: LobbyPageComponent,
        title: 'Loan Request'
    },
    {
        path: '**',
        redirectTo: ''
    }
];
