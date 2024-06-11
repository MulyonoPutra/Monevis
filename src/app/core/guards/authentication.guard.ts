import { Observable, take, timer } from 'rxjs';
import { Router, UrlTree } from '@angular/router';

import { Injectable } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';

type BooleanTypes = Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;

@Injectable({
	providedIn: 'root',
})
export class AuthenticationGuard {
	constructor(
		private storage: StorageService,
		private router: Router,
	) {}

	canActivate(): BooleanTypes {
		const userId = this.storage.getUserId();
		if (!userId) {
			timer(2000)
				.pipe(take(1))
				.subscribe(() => {
					alert('You must login first to access this resource.');
					this.router.navigate(['/auth/login'], {
						replaceUrl: true,
					});
				});

			return false;
		}

		return true;
	}
}
