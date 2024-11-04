import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {

  httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';
  
  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }

  // Crear un nuevo usuariO:
  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user);
  }

  // Actualizar usuario:
  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/${user.uid}`, user);
  }

  // Eliminar un usuario por uid:
  deleteUser(uid: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${uid}`);
  }
}
