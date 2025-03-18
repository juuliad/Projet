import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FicheFrais } from '../models/fichefrais'; // Importation correcte

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class FicheFraisService {
  getFichesFraisParVisiteur(id: number) {
    throw new Error('Method not implemented.');
  }
  apiURL = 'http://localhost:8080/api/fichefrais';

  constructor(private http: HttpClient) {}

  // Obtenir la liste des fiches de frais
  listeFicheFrais(): Observable<FicheFrais[]> {
    const url = `${this.apiURL}/all`;
    return this.http.get<FicheFrais[]>(url);
  }

  getFichesFrais(visiteurId: number): Observable<FicheFrais[]> {
    return this.http.get<FicheFrais[]>(`/api/fiches-frais/${visiteurId}`);
  }

  ajouterFicheFrais(fiche: FicheFrais): Observable<FicheFrais> {
    const url = `${this.apiURL}/save`;
    return this.http.post<FicheFrais>(url, fiche, httpOptions);
  }

  supprimerFicheFrais(id: number): Observable<void> {
    const url = `${this.apiURL}/delete/${id}`;
    return this.http.delete<void>(url, httpOptions);
  }

  updateFicheFrais(fiche: FicheFrais): Observable<FicheFrais> {
    const url = `${this.apiURL}/update`;
    return this.http.put<FicheFrais>(url, fiche, httpOptions);
  }

}
