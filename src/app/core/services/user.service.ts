import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  env = 'http://localhost:3000';
  constructor(private readonly http: HttpClient) { }

  findAll(): Observable<any> {
    return this.http.get(`${this.env}/user`);
  }

  create(body: any): Observable<any> {
    return this.http.post(`${this.env}/user`, body);
  }

}
