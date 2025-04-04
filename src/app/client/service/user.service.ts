import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post('http://localhost:8080/api/visiteurs/login', { username, password }, { responseType: 'text' })
      .pipe(
        tap((response: string) => {
          if (response === 'Connexion réussie') {
            console.log('Connexion réussie');
            // Stockez le token ou redirigez l'utilisateur
          } else {
            console.error('Identifiants incorrects', response);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur de connexion', error);
          return of(null); // Retourne un observable vide en cas d'erreur
        })
      );
  }
}

