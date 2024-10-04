import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EvaluateNestService {
  private apiUrl = 'http://localhost:8000/evaluate-behavior';

  constructor(private http: HttpClient) {}

  // Método para enviar la solicitud
  evaluateNest(assignedID: string, sensorAssignedID: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      assignedID: assignedID,
      sensorAssignedID: sensorAssignedID
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
