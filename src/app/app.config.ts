import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { CURRENT_USER, USER_OBJECT } from './core/user.object';
import { THEME, themeFactory } from './Banking/shared/theme/theme.factory';
import { provideState, provideStore } from '@ngrx/store';
import { loansReducer } from './Banking/store/loans.reducer';
import Aura from '@primeuix/themes/aura';
import { AuraBaseDesignTokens } from '@primeuix/themes/aura/base';
import { Preset } from '@primeuix/themes/types';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore(),
    provideState('loans', loansReducer),
    { provide: USER_OBJECT, useValue: CURRENT_USER },
    { provide: THEME, useFactory: themeFactory }
  ],
};

