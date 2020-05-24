import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(cartaoCidadao: string, password: string): Observable<any> {
    return this.http.post<any>(
      'http://localhost:3000/api/v1/auth/login',
      JSON.stringify({ cartaoCidadao, password }),
      httpOptions
    );
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
  register(cartaoCidadao: string, password: string): Observable<any> {
    return this.http.post<any>(
      'http://localhost:3000/api/v1/auth/users/register',
      { cartaoCidadao, password }
    );
  }
}
