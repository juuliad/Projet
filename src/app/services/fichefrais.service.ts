import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheFrais } from '../model/fiche-frais';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class FicheFraisService {
  apiURL = 'http://localhost:8080/api/fichefrais';

  constructor(private http: HttpClient) {}

  // Obtenir la liste des fiches de frais
  listeFicheFrais(): Observable<FicheFrais[]> {
    const url = `${this.apiURL}/all`;
    return this.http.get<FicheFrais[]>(url);
  }

  // Obtenir les fiches de frais d'un visiteur spécifique
  getFichesFrais(visiteurId: number): Observable<FicheFrais[]> {
    const url = `${this.apiURL}/${visiteurId}`;
    return this.http.get<FicheFrais[]>(url);
  }

  // Ajouter une nouvelle fiche de frais
  ajouterFicheFrais(fiche: FicheFrais): Observable<FicheFrais> {
    const url = `${this.apiURL}/save`;
    return this.http.post<FicheFrais>(url, fiche, httpOptions);
  }

  // Supprimer une fiche de frais par ID
  supprimerFicheFrais(id: number): Observable<void> {
    const url = `${this.apiURL}/delete/${id}`;
    return this.http.delete<void>(url, httpOptions);
  }

  // Mettre à jour une fiche de frais
  updateFicheFrais(fiche: FicheFrais): Observable<FicheFrais> {
    const url = `${this.apiURL}/update`;
    return this.http.put<FicheFrais>(url, fiche, httpOptions);
  }
}
