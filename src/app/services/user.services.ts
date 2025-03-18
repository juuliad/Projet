import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/visiteurs/login'; // Assure-toi que l'URL de ton backend est correcte

  constructor(private http: HttpClient) {}

  // Dans le service
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(this.apiUrl, body);
  }
}