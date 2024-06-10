import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../models/http-response-entity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaksi } from '../models/transaksi';

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  env = 'http://localhost:3000';
  constructor(private readonly http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(`${this.env}/transaksi`);
  }

  create(body: any): Observable<any> {
    return this.http.post(`${this.env}/transaksi`, body);
  }

  update(id: number, body: any): Observable<any> {
    return this.http.patch(`${this.env}/transaksi/${id}`, body);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.env}/transaksi/${id}`);
  }

  findById(id: number): Observable<HttpResponseEntity<Transaksi>> {
    return this.http.get<HttpResponseEntity<Transaksi>>(`${this.env}/transaksi/${id}`);
  }

}
