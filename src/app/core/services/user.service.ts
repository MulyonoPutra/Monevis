import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../models/http-response-entity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	env = 'http://localhost:3000';

	constructor(private readonly http: HttpClient) {}

	findAll(): Observable<any> {
		return this.http.get(`${this.env}/user`);
	}

	create(body: any): Observable<any> {
		return this.http.post(`${this.env}/user`, body);
	}

	update(id: number, body: any): Observable<any> {
		return this.http.patch(`${this.env}/user/${id}`, body);
	}

	remove(id: number): Observable<any> {
		return this.http.delete(`${this.env}/user/${id}`);
	}

	findById(id: number): Observable<HttpResponseEntity<User>> {
		return this.http.get<HttpResponseEntity<User>>(`${this.env}/user/${id}`);
	}
}
