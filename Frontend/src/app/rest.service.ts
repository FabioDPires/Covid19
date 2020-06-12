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

  addUser(user: User): Observable<User> {
    return this.http.post<User>(
      endpoint + 'auth/register',
      JSON.stringify(user),
      httpOptions
    );
  }

  addAdmin(admin: User): Observable<User> {
    return this.http.post<User>(
      endpoint + 'auth/register/admin',
      JSON.stringify(admin),
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
    return this.http.get<User[]>(endpoint + 'users');
  }

  getUser(id: String): Observable<User> {
    return this.http.get<User>(endpoint + 'auth/userProfile/' + id);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(endpoint + 'user/' + id, httpOptions);
  }

  getHistory(id: String): Observable<Request[]> {
    return this.http.get<Request[]>(endpoint + 'user/' + id + '/history');
  }

  getNumberUserTests(id: String): Observable<number> {
    return this.http.get<number>(endpoint + 'user/' + id + '/numberOfTests');
  }

  changePassword(id: String, user: User): Observable<User> {
    return this.http.put<User>(
      endpoint + 'auth/user/' + id + '/updatePassword',
      JSON.stringify(user),
      httpOptions
    );
  }

  addRequest(request: Request): Observable<Request> {
    return this.http.post<Request>(
      endpoint + 'requests',
      JSON.stringify(request),
      httpOptions
    );
  }

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(endpoint + 'requests');
  }

  getRequest(id: String): Observable<Request> {
    return this.http.get<Request>(endpoint + 'request/' + id, httpOptions);
  }

  scheduleRequest(id: String, request: Request): Observable<Request> {
    return this.http.put<Request>(
      endpoint + 'request/' + id + '/schedule',
      JSON.stringify(request),
      httpOptions
    );
  }

  setRequestResult(id: String, request: Request): Observable<Request> {
    console.log('Aqui está o conteudo:', request);
    return this.http.put<Request>(
      endpoint + 'request/' + id + '/setResult',
      JSON.stringify(request),
      httpOptions
    );
  }

  getAverageTests(): Observable<any> {
    return this.http.get<any>(endpoint + 'stats/averageTestsPerUser');
  }

  getInfectedSex(): Observable<any> {
    return this.http.get<any>(endpoint + 'stats/infectedPerSex');
  }

  getInfectedAge(): Observable<any> {
    return this.http.get<any>(endpoint + 'stats/infectedPerAge');
  }

  getUsersHealth(): Observable<any> {
    return this.http.get<any>(endpoint + 'stats/usersHealth');
  }

  getRequestsState(): Observable<any> {
    return this.http.get<any>(endpoint + 'stats/states');
  }

  getRequestResults(): Observable<any> {
    return this.http.get<any>(endpoint + 'stats/results');
  }

  getRequestsPerMonth(): Observable<any> {
    return this.http.get<any>(endpoint + 'stats/requestsPerMonth');
  }
}
