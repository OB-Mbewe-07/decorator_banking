import { Routes } from '@angular/router';
import { ParentComponent } from './Banking/components/parent.component/parent.component';
import { LobbyPageComponent } from './Banking/components/lobby.component/lobby.component';
import { NotFoundComponentPage } from './Banking/components/not-found.component/not-found.component';
import { unsavedChangesGaurd } from './core/guards/unsaved-changes.gaurds';
import { AppLoginComponent } from './Banking/components/login.component/login.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLoginComponent,
    title: 'Login',
  },
  {
    path: 'admin',
    component: ParentComponent,
    title: 'All accounts',
    data: { title: 'Accounts' },
  },
  {
    path: 'loan-request',
    component: LobbyPageComponent,
    title: 'Loan Request',
    data: { title: 'Loans Request' },
    canDeactivate: [unsavedChangesGaurd],
  },
  {
    path: '**',
    component: NotFoundComponentPage,
    title: 'Page not found',
  },
];
