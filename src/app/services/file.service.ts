import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private uploadUrl = 'http://localhost:3000/upload-file';  // URL para subir archivos
  private getUrl = 'http://localhost:3000/get-file';  // URL base para consultar archivos

  constructor(private http: HttpClient) {}

  // Subir archivo al backend
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.uploadUrl, formData);
  }

  // Consultar archivo desde el backend con el nombre del archivo
  getFile(filename: string): Observable<string> {
    return this.http.get(`${this.getUrl}/${filename}`, { responseType: 'text' });
  }
}
