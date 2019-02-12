import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  post(api: string, data?: any) {
    return this.http.post<any>(api, data, this.getHeaders());
  }

  // Get Api Method
  get(api: string) {
    return this.http.get<any>(api, this.getHeaders());
  }

  // Headers Method
  getHeaders() {
    return {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
        'Authorization': (localStorage.getItem('token')) ? localStorage.getItem('token') : ''
      })};
  }

  handleError(errorType, user) {

  }
}
