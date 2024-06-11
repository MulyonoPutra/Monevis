import { Injectable } from '@angular/core';

export enum AuthKey {
	UserId = 'UserID',
}

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	constructor() {}

	public setUserId(token: string): void {
		sessionStorage.removeItem(AuthKey.UserId);
		if (token) {
			sessionStorage.setItem(AuthKey.UserId, token);
		}
	}

	public getUserId(): string {
		return sessionStorage.getItem(AuthKey.UserId)!;
	}

	public clear() {
		sessionStorage.clear();
	}
}
