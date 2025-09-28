import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';

import { App } from './app/app';
import { routes } from './app/app-routing-module';
import { jwtInterceptor } from './app/core/interceptors/jwt-interceptor';

bootstrapApplication(App, {
  providers: [
    importProvidersFrom(HttpClientModule),          // Import HttpClientModule
    provideRouter(routes),                          // Provide router
    provideHttpClient(withInterceptors([jwtInterceptor])) // Functional interceptor
  ]
}).catch(err => console.error(err));
