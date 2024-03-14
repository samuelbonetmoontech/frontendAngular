import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements HttpInterceptor {
  private apiUrl = 'http://localhost:3000/auth'; 
  private tokenKey = 'currentUserToken';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.setCurrentUserToken(token);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getCurrentUserToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }

  login(credentials: { email: string, password: string }): Observable<{ token: string }> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Por favor, introduce un correo electrónico y una contraseña');
    }

    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  setCurrentUserToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getCurrentUserToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/user/current');
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}?email=${email}`);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
