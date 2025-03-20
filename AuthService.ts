import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post('http://localhost:8080/api/visiteurs/login', { username, password })
      .pipe(
        tap((response: any) => {
          if (response.success) {
            console.log('Connexion réussie', response);
            // Stockez le token ou redirigez l'utilisateur
          } else {
            console.error('Identifiants incorrects', response);
          }
        }),
        catchError((error) => {
          console.error('Erreur de connexion', error);
          return of(null); // Retourne un observable vide en cas d'erreur
        })
      );
  }
}