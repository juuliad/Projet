import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080/api/visiteurs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected get requestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*'
    });
    return { headers };
  }

  authSubject = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private router: Router) {}

  // Méthode d'inscription, maintenant acceptant un objet complet
  register(signupData: { username: string; password: string; confirmPassword: string; role: string }): Observable<any> {

    // Vous pouvez ici vérifier si les mots de passe sont bien égaux avant d'envoyer la requête.
    if (signupData.password !== signupData.confirmPassword) {
      return throwError(() => new Error('Les mots de passe ne correspondent pas.'));
    }

    return this.httpClient.post(AUTH_API + '/user', signupData)
      .pipe(
        catchError(error => {
          console.error('Erreur lors de l\'inscription:', error);
          return throwError(() => error);
        })
      );
  }

  // Autres méthodes comme login peuvent être ajoutées ici...
}
