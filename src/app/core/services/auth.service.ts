import { CreateLoginDto } from '../models/dto/create-login.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	env = 'http://localhost:3000';
	constructor(private readonly http: HttpClient) {}

	login(body: CreateLoginDto): Observable<any> {
		return this.http.post<any>(`${this.env}/auth/login`, body);
	}
}
