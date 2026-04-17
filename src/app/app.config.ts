import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { CURRENT_USER, USER_OBJECT } from './core/user.object';
import { THEME, themeFactory } from './Banking/theme/theme.factory';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore(),
    { provide: USER_OBJECT, useValue: CURRENT_USER },
    { provide: THEME, useFactory: themeFactory }
  ],
};
