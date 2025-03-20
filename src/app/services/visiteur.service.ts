import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Visiteur } from '../model/visiteur';

@Injectable({
  providedIn: 'root'
})
export class VisiteurService {

  private apiURL = 'http://localhost:8080/api/visiteur'; // Ton URL d'API

  constructor(private http: HttpClient) {}

  // Méthode pour consulter un visiteur par ID
  consulterVisiteur(id: number): Observable<Visiteur> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Visiteur>(url);
  }

  // Liste des visiteurs
  listeVisiteur(): Observable<Visiteur[]> {
    return this.http.get<Visiteur[]>(this.apiURL);
  }

  // Ajouter un visiteur
  ajouterVisiteur(visiteur: Visiteur): Observable<Visiteur> {
    const url = `${this.apiURL}/save`;
    return this.http.post<Visiteur>(url, visiteur);
  }

  // Supprimer un visiteur
  supprimerVisiteur(id: number): Observable<void> {
    const url = `${this.apiURL}/delete/${id}`;
    return this.http.delete<void>(url);
  }
}
