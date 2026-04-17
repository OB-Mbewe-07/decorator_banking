import { Routes } from '@angular/router';
import { ParentComponent } from './Banking/parent.component/parent.component';
import { LobbyPageComponent } from './Banking/components/lobby.component/lobby.component';
import { NotFoundComponentPage } from './Banking/not-found.component/not-found.component';
import { unsavedChangesGaurd } from './core/guards/unsaved-changes.gaurds';

export const routes: Routes = [
  {
    path: '',
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
