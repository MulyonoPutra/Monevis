import { CreateUserDto } from '../models/dto/create-user.dto';
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

  findAll(): Observable<HttpResponseEntity<User[]>> {
    return this.http.get<HttpResponseEntity<User[]>>(`${this.env}/user`);
	}

  create(body: CreateUserDto): Observable<HttpResponseEntity<User>> {
    return this.http.post<HttpResponseEntity<User>>(`${this.env}/user`, body);
	}

  update(id: number, body: any): Observable<HttpResponseEntity<User>> {
    return this.http.patch<HttpResponseEntity<User>>(`${this.env}/user/${id}`, body);
	}

  remove(id: number): Observable<HttpResponseEntity<User>> {
    return this.http.delete<HttpResponseEntity<User>>(`${this.env}/user/${id}`);
	}

	findById(id: number): Observable<HttpResponseEntity<User>> {
		return this.http.get<HttpResponseEntity<User>>(`${this.env}/user/${id}`);
	}
}
