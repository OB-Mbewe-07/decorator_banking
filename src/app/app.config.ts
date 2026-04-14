import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { CURRENT_USER, USER_OBJECT } from './core/user.object';
import { THEME, themeFactory } from './Banking/theme/theme.factory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: USER_OBJECT, useValue: CURRENT_USER },
    { provide: THEME, useFactory: themeFactory }
  ],
};
