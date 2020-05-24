import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from './models/request';
import { User } from './models/user';

const endpoint = 'http://localhost:3000/api/v1/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getRequest(id: String): Observable<Request> {
    return this.http.get<Request>(endpoint + 'request/' + id, httpOptions);
  }

  addRequest(request: Request): Observable<Request> {
    return this.http.post<Request>(
      endpoint + 'requests',
      JSON.stringify(request),
      httpOptions
    );
  }

  scheduleRequest(id: String, request: Request): Observable<Request> {
    return this.http.put<Request>(
      endpoint + '/request/' + id + '/schedule',
      JSON.stringify(request),
      httpOptions
    );
  }

  setRequestResult(id: String, request: Request): Observable<Request> {
    return this.http.put<Request>(
      endpoint + '/request/' + id + '/setResult',
      JSON.stringify(request),
      httpOptions
    );
  }

  addTechnical(technical: User): Observable<User> {
    return this.http.post<User>(
      endpoint + 'auth/register/technical',
      JSON.stringify(technical),
      httpOptions
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(endpoint + 'auth/allUsers');
  }
}
