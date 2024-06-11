import { CreateTransaksiDto } from '../models/dto/create-transaksi.dto';
import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../models/http-response-entity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaksi } from '../models/transaksi';

@Injectable({
	providedIn: 'root',
})
export class TransaksiService {
	env = 'http://localhost:3000';
	constructor(private readonly http: HttpClient) {}

	findAll(): Observable<HttpResponseEntity<Transaksi[]>> {
		return this.http.get<HttpResponseEntity<Transaksi[]>>(`${this.env}/transaksi`);
	}

	create(body: CreateTransaksiDto): Observable<HttpResponseEntity<Transaksi>> {
		return this.http.post<HttpResponseEntity<Transaksi>>(`${this.env}/transaksi`, body);
	}

	update(id: number, body: any): Observable<HttpResponseEntity<Transaksi>> {
		return this.http.patch<HttpResponseEntity<Transaksi>>(`${this.env}/transaksi/${id}`, body);
	}

	remove(id: number): Observable<HttpResponseEntity<Transaksi>> {
		return this.http.delete<HttpResponseEntity<Transaksi>>(`${this.env}/transaksi/${id}`);
	}

	findById(id: number): Observable<HttpResponseEntity<Transaksi>> {
		return this.http.get<HttpResponseEntity<Transaksi>>(`${this.env}/transaksi/${id}`);
	}
}
