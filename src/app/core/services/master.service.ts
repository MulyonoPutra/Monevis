import { Observable, map } from 'rxjs';

import { Bulan } from '../models/bulan';
import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../models/http-response-entity';
import { Injectable } from '@angular/core';
import { Unit } from '../models/unit';

@Injectable({
	providedIn: 'root',
})
export class MasterService {
	env = 'http://localhost:3000';
	constructor(private readonly http: HttpClient) {}

	findAll(): Observable<HttpResponseEntity<Unit[]>> {
		return this.http.get<HttpResponseEntity<Unit[]>>(`${this.env}/daftar-unit`);
	}

	create(body: any): Observable<HttpResponseEntity<Unit>> {
		return this.http.post<HttpResponseEntity<Unit>>(`${this.env}/daftar-unit`, body);
	}

	update(id: number, body: any): Observable<HttpResponseEntity<Unit>> {
		return this.http.patch<HttpResponseEntity<Unit>>(`${this.env}/daftar-unit/${id}`, body);
	}

	remove(id: number): Observable<HttpResponseEntity<Unit>> {
		return this.http.delete<HttpResponseEntity<Unit>>(`${this.env}/daftar-unit/${id}`);
	}

	findById(id: number): Observable<HttpResponseEntity<Unit>> {
		return this.http.get<HttpResponseEntity<Unit>>(`${this.env}/daftar-unit/${id}`);
	}

	findAllBulan(): Observable<HttpResponseEntity<Bulan[]>> {
		return this.http.get<HttpResponseEntity<Bulan[]>>(`${this.env}/bulan`);
	}

	createBulan(body: any): Observable<HttpResponseEntity<Bulan>> {
		return this.http.post<HttpResponseEntity<Bulan>>(`${this.env}/bulan`, body);
	}

	updateBulan(id: number, body: any): Observable<HttpResponseEntity<Bulan>> {
		return this.http.patch<HttpResponseEntity<Bulan>>(`${this.env}/bulan/${id}`, body);
	}

	removeBulan(id: number): Observable<HttpResponseEntity<Bulan>> {
		return this.http.delete<HttpResponseEntity<Bulan>>(`${this.env}/bulan/${id}`);
	}

	findBulanById(id: number): Observable<HttpResponseEntity<Bulan>> {
		return this.http.get<HttpResponseEntity<any>>(`${this.env}/bulan/${id}`);
	}
}
