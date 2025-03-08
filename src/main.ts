import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Importa as rotas
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
    providers: [provideRouter(routes), provideHttpClient(),
    importProvidersFrom(CommonModule) // Certifica-se de que os módulos comuns estão disponíveis
  ]
})
  .catch(err => console.error(err));
