import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable,map } from 'rxjs';
import { throwError } from 'rxjs';

interface LoginResponse {
  token: string;
  // Add other properties if your backend returns more data
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Replace with your actual API endpoint
  private apiUrl = 'https://inventoryapi-f3au.onrender.com';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password });
  }

  postData(url: any,data: any) {
    return this.http.post(`${this.apiUrl+url}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.error;
    }
    return throwError(errorMessage);
  }
}
