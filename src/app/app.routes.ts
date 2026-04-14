import { Routes } from '@angular/router';
import { ParentComponent } from './Banking/parent.component/parent.component';

export const routes: Routes = [
    {
        path: '/',
        component: ParentComponent,
        title: 'All accounts'
    },
    {
        path: '/LoanRequest', 
        component
    }
    {
        path: '**'
        redirectTo: ''
    }
];
