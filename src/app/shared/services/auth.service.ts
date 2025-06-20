import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from '../Models/user';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

interface TokenData {
  access_token: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  backendURL = 'http://localhost:8000';

  constructor(private userService: UserService, private http: HttpClient) {}

  isLogged: boolean = false;
  access_token!: string;
  token_type!: string;

  login(username: string, password: string): Observable<TokenData> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http
      .post<TokenData>(this.backendURL + '/auth/login', body.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      switch (error.status) {
        case 401:
          errorMessage = 'Invalid credentials';
          break;
        case 404:
          errorMessage = error.error.detail || 'User not found';
          break;
        case 500:
          errorMessage =
            'Server error: ' + (error.error.detail || 'Internal Server Error');
          break;
      }
    }

    return throwError(() => new Error(errorMessage));
  }

  setLoginDetails(access_token: string, token_type: string, isLogged: boolean) {
    this.access_token = access_token;
    this.token_type = token_type;
    this.isLogged = isLogged;
  }

  logout(): void {
    this.isLogged = false;
  }

  isAuthenticated(): boolean {
    return this.isLogged;
  }

  signup(
    // username: string,
    email: string,
    password: string
  ) {
    // const body = new URLSearchParams();
    // body.set('username', email);
    // body.set('email', email);
    // body.set('password', password);
    const body = {
      username: email,
      email: email,
      password: password,
    };

    return this.http
      .post<TokenData>(this.backendURL + '/user/register', body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleSignUpErrors));
  }
  handleSignUpErrors(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      switch (error.status) {
        case 400:
          errorMessage = 'User already exists';
          break;
        case 500:
          errorMessage =
            'Server error: ' + (error.error.detail || 'Internal Server Error');
          break;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
