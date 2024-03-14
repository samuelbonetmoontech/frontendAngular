import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getConnectionLogs(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}/connection-logs`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user)
  }

  loginUser(user: User): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/login`, user);
  }

  verificarActividad(logueoUsuario: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/login`, logueoUsuario);
  }

  updateUser(id: string, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, updatedUser).pipe(
      catchError(error => {
        console.error(`Error al actualizar usuario con ID ${id}:`, error);
        throw error;
      })
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  registrarUsuario(usuario: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', usuario);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/users/check-email?email=${email}`);
  }

  findUserByName(name: string): Observable<any> {

    return this.http.get<any>(`/api/users?name=${name}`);
  }

  getUserByName(userId: string): Observable<{ name: string }> {
    return this.http.get<{ name: string }>(`/api/users/${userId}`);
  }
}

