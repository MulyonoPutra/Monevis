import { Observable, map } from 'rxjs';

import { Bulan } from '../models/bulan';
import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../models/http-response-entity';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class MasterService {
	env = 'http://localhost:3000';
	constructor(private readonly http: HttpClient) {}

	findAll(): Observable<any> {
		return this.http.get(`${this.env}/daftar-unit`);
	}

	create(body: any): Observable<any> {
		return this.http.post(`${this.env}/daftar-unit`, body);
	}

	update(id: number, body: any): Observable<any> {
		return this.http.patch(`${this.env}/daftar-unit/${id}`, body);
	}

	remove(id: number): Observable<any> {
		return this.http.delete(`${this.env}/daftar-unit/${id}`);
	}

	findById(id: number): Observable<HttpResponseEntity<any>> {
		return this.http.get<HttpResponseEntity<any>>(`${this.env}/daftar-unit/${id}`);
	}

	findAllBulan(): Observable<any> {
		return this.http.get(`${this.env}/bulan`);
	}

	createBulan(body: any): Observable<any> {
		return this.http.post(`${this.env}/bulan`, body);
	}

	updateBulan(id: number, body: any): Observable<any> {
		return this.http.patch(`${this.env}/bulan/${id}`, body);
	}

	removeBulan(id: number): Observable<any> {
		return this.http.delete(`${this.env}/bulan/${id}`);
	}

	findBulanById(id: number): Observable<HttpResponseEntity<Bulan>> {
		return this.http.get<HttpResponseEntity<any>>(`${this.env}/bulan/${id}`);
	}
}
