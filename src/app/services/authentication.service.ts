import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/auth'; 

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }) {
    if (!credentials.email || !credentials.password) {
      throw new Error('Por favor, introduce un correo electrónico y una contraseña');
    }

    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/user/current');
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}?email=${email}`);
  }
}
