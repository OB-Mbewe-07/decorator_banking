import { Routes } from '@angular/router';
import { ParentComponent } from './Banking/parent.component/parent.component';
import {LobbyPageComponent} from './Banking/lobby.component/lobby.component'
import { NotFoundComponentPage } from './Banking/not-found.component/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: ParentComponent,
        title: 'All accounts'
    },
    {
        path: 'loan-request', 
        component: LobbyPageComponent,
        title: 'Loan Request'
    },
    {   
        path: '404',
        component: NotFoundComponentPage,
        title: 'Page not found'
    },
    {
        path: '**',
        redirectTo: '404'
    }
];
