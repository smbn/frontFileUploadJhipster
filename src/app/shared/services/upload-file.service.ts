import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://localhost:8081/services/microservicegir/api/information-personnelles/upload-photo';

  constructor(private http: HttpClient) {}

  // addPhoto(codeEtu: string, file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);

  //   return this.http.post(`${this.baseUrl}/${codeEtu}`, formData, {
  //     headers: new HttpHeaders({
  //       'enctype': 'multipart/form-data'
  //     }),
  //   });
  // }

  // addPhoto(codeEtu: string, file: File): Promise<void> {
  //   const formData = new FormData();
  //   formData.append('file', file, file.name);

  //   // const headers = new HttpHeaders();
  //   // headers.set('Accept', 'application/json');

  //   const headers = new HttpHeaders();
  //   headers.set('Accept', 'multipart/form-data');

  //   return this.http.post<void>(`${this.baseUrl}/${codeEtu}`, formData, { headers: headers }).toPromise();
  // }

  addPhoto(codeEtu: string, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders().set('X-CSRF-TOKEN', this.getCsrfToken());

    return this.http.post(`${this.baseUrl}/${codeEtu}`, formData, { headers });
  }

  private getCsrfToken(): string {
    const name = 'XSRF-TOKEN=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
}
