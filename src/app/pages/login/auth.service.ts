import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private testApiUrl = 'http://localhost:8089/dbp/auth/login'; // Cambia esta URL si es necesario
  private prodApiUrl = 'http://norsucio.com:8089/dbp/auth/login'; // Cambia esta URL si es necesario

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    });

    const body = {
      email: email,
      password: password,
    };
    alert(body.email)
    return this.http.post(this.testApiUrl, body, { headers });
  }
}
