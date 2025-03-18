import { provideHttpClient, withFetch } from '@angular/common/http'; // N'oublie pas d'importer withFetch
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()), // Ajoute withFetch ici pour activer l'API fetch
  ]
};
