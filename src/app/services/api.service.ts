import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  // Se establece la base url del API a consumir apiURL
  apiURL = 'https://my.api.mockaroo.com/noticias.json?key=c917b880';
  // https://my.api.mockaroo.com/noticias.json?key=915f9190
  // https://my.api.mockaroo.com/noticias.json?key=9bfe5340
  // Por Si La De Arriba No Funciona

  // Se declara la variable http de tipo HttpClient
  constructor(private http: HttpClient) {}

  // Funcion de gets
  getPosts(): Observable<any> {
      return this.http.get(this.apiURL).pipe(retry(3));
  }
  getPost(id: number): Observable<any> {
    return this.http.get(`${this.apiURL}?id=${id}`).pipe(retry(3));
  }
  createPost(post: any): Observable<any> {
    return this.http
      .post(this.apiURL + '/posts', post, this.httpOptions)
      .pipe(retry(3));
  }
  updatePost(id: number, post: any): Observable<any> {
    return this.http
      .put(this.apiURL + '/posts/' + id, post, this.httpOptions)
      .pipe(retry(3));
  }
  deletePost(id:number): Observable<any> {
    return this.http.delete(this.apiURL + '/posts/' + id, this.httpOptions);
  }
}
