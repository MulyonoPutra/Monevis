import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { ToastService } from './shared/services/toast.service';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		MessageService,
		ToastService,
		provideAnimations(),
		importProvidersFrom(BrowserModule, BrowserAnimationsModule),
		provideRouter(routes),
		HttpClientModule,
		provideHttpClient(),
	],
};
