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
  // URL de base modifiée pour respecter la casse définie dans le back-end
  apiURL = 'http://localhost:8080/api/ficheFrais';
  constructor(private http: HttpClient) {}
  // Obtenir la liste des fiches de frais
  listeFicheFrais(): Observable<FicheFrais[]> {
    return this.http.get<FicheFrais[]>(this.apiURL);
  }
  // Obtenir les fiches de frais d'un visiteur spécifique
  getFichesFrais(visiteurId: number): Observable<FicheFrais[]> {
    const url = `${this.apiURL}/visiteur/${visiteurId}`;
    return this.http.get<FicheFrais[]>(url);
  }
  // Ajouter une nouvelle fiche de frais
  ajouterFicheFrais(fiche: FicheFrais): Observable<FicheFrais> {
    const finalFicheFrais=JSON.stringify(fiche);
    console.log("ficheFraisImportant", finalFicheFrais);
    return this.http.post<FicheFrais>(this.apiURL, finalFicheFrais, httpOptions);
  }
  // Supprimer une fiche de frais par ID
  supprimerFicheFrais(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url, httpOptions);
  }
  // Mettre à jour une fiche de frais en passant l'ID dans l'URL
  updateFicheFrais(id: number, fiche: FicheFrais): Observable<FicheFrais> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put<FicheFrais>(url, fiche, httpOptions);
  }
}
