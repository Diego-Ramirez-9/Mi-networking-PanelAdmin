import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../enviroment/enviroment';

export interface BackendUser {
  _id: string;
  // Campos en inglés (nuevos)
  name?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  jobTitle?: string;
  // Campos en español (legacy)
  nombre?: string;
  apellido?: string;
  correo?: string;
  telefono?: string;
  puesto?: string;
  // Comunes
  firebase_uid: string;
  estado?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  firebase_uid: string;
  Name: string;
  Email: string;
  Phone?: string;
  avatar: string;
  lastModification: string;
  status: string;
  registrationDate: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `${environment.apiUrl}users`;

  constructor(private http: HttpClient) {}

  getUsers(search?: string): Observable<User[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('name', search);
    }
    return this.http.get<BackendUser[]>(this.baseUrl, { params }).pipe(
      map(users =>
        users.map(u => {
          // Extraemos primero el dato “en inglés” o fallback al “legacy” en español
          const firstName = u.name ?? u.nombre ?? '';
          const lastName  = u.lastName ?? u.apellido ?? '';
          const emailRaw  = u.email ?? u.correo ?? '';
          const phoneRaw  = u.phoneNumber ?? u.telefono ?? '';
          const jobRaw    = u.jobTitle ?? u.puesto ?? '';

          return {
            // Raw para formularios
            id: u._id,
            name: firstName,
            lastname: lastName,
            email: emailRaw,
            phone: phoneRaw,
            jobTitle: jobRaw,
            firebase_uid: u.firebase_uid,
            // Presentación
            Name: `${firstName} ${lastName}`.trim(),
            Email: emailRaw,
            Phone: phoneRaw,
            avatar: 'https://i.pravatar.cc/40',
            lastModification: u.updatedAt ?? '—',
            status: 'Active',
            registrationDate: u.createdAt ?? '—'
          } as User;
        })
      )
    );
  }

  createUser(payload: Partial<BackendUser>): Observable<BackendUser> {
    return this.http.post<BackendUser>(this.baseUrl, payload);
  }

  updateUser(id: string, payload: Partial<BackendUser>): Observable<BackendUser> {
    return this.http.put<BackendUser>(`${this.baseUrl}/${id}`, payload);
  }

  deleteUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
