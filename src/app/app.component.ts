import {
	Event,
	NavigationCancel,
	NavigationEnd,
	NavigationError,
	NavigationStart,
	Router,
	RouterOutlet,
} from '@angular/router';
import { take, timer } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ToastModule } from 'primeng/toast';
import { ToastService } from './shared/services/toast.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		CommonModule,
		RouterOutlet,
		HttpClientModule,
		ToastModule,
		NavbarComponent,
		SpinnerComponent,
		ToastComponent,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	providers: [MessageService, ToastService],
})
export class AppComponent {
	title = 'monevis';

	loadingIndicator!: boolean;

	constructor(
		private router: Router,
		private toastService: ToastService,
	) {
		this.showSpinner();
	}

	showSpinner(): void {
		this.router.events.subscribe((routeEvent: Event) => {
			if (routeEvent instanceof NavigationStart) {
				this.loadingIndicator = true;
			}

			if (routeEvent instanceof NavigationEnd) {
				this.delay();
			}

			if (
				routeEvent instanceof NavigationEnd ||
				routeEvent instanceof NavigationError ||
				routeEvent instanceof NavigationCancel
			) {
				this.delay();
			}
		});
	}

	delay(): void {
		timer(1000)
			.pipe(take(1))
			.subscribe(() => {
				this.loadingIndicator = false;
			});
	}
}
