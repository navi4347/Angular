import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = 'http://localhost:5000/api/signup';

  constructor(private http: HttpClient) { }

  getAllSignupData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getSignupData(userid: string): Observable<any> {
    const getUrl = `${this.apiUrl}/${userid}`;
    return this.http.get<any>(getUrl);
  }

  addSignupData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateSignupData(userid: string, data: any): Observable<any> {
    const updateUrl = `${this.apiUrl}/${userid}`;
    return this.http.put<any>(updateUrl, data);
  }

  deleteSignupData(userid: string): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${userid}`;
    return this.http.delete<any>(deleteUrl);
  }
}
