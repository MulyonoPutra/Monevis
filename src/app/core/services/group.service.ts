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

	create(body: CreateGroupDto): Observable<any> {
		return this.http.post(`${this.env}/group`, body);
	}

	update(id: number, body: any): Observable<any> {
		return this.http.patch(`${this.env}/group/${id}`, body);
	}

	remove(id: number): Observable<any> {
		return this.http.delete(`${this.env}/group/${id}`);
	}

	findById(id: number): Observable<HttpResponseEntity<Group>> {
		return this.http.get<HttpResponseEntity<Group>>(`${this.env}/group/${id}`);
	}
}
