//Importerar inställningsverktyg från Angular
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
//Importerar verktyget som ger appen tillgång till http anrop
import { provideHttpClient } from '@angular/common/http'; 
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Registrerar HTTP-verktyget så att min CourseService tillåts hämta JSON-filen
    provideHttpClient() 
  ]
};