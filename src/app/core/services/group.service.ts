import { Observable, map } from 'rxjs';

import { CreateGroupDto } from '../models/dto/create-group.dto';
import { Group } from '../models/group';
import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../models/http-response-entity';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class GroupService {
	env = 'http://localhost:3000';
	constructor(private readonly http: HttpClient) {}

	findAll(): Observable<HttpResponseEntity<Group[]>> {
		return this.http.get<HttpResponseEntity<Group[]>>(`${this.env}/group`);
	}

	create(body: CreateGroupDto): Observable<HttpResponseEntity<Group>> {
		return this.http.post<HttpResponseEntity<Group>>(`${this.env}/group`, body);
	}

	update(id: number, body: any): Observable<HttpResponseEntity<Group>> {
		return this.http.patch<HttpResponseEntity<Group>>(`${this.env}/group/${id}`, body);
	}

	remove(id: number): Observable<HttpResponseEntity<Group>> {
		return this.http.delete<HttpResponseEntity<Group>>(`${this.env}/group/${id}`);
	}

	findById(id: number): Observable<HttpResponseEntity<Group>> {
		return this.http.get<HttpResponseEntity<Group>>(`${this.env}/group/${id}`);
	}
}
