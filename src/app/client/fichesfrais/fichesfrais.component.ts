// src/app/fichefrais/fichefrais.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Etat } from '../../model/etat';
import { FicheFrais } from '../../model/fiche-frais';
import { Visiteur } from '../../model/visiteur';
import { EtatService } from '../../services/etat.service';
import { FicheFraisService } from '../../services/fichefrais.service';
import { VisiteurService } from '../../services/visiteur.service';

@Component({
  selector: 'app-fiche-frais',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './fichesfrais.component.html',
  styleUrls: ['./fichesfrais.component.css'],
})
export class FicheFraisComponent implements OnInit {
  fichesFrais: FicheFrais[] = [];
  visiteur: Visiteur | null = null;
  etats: Etat[] = [];
  ajouterFicheForm = false;
  consulterFicheForm = false;
  updateFicheForm = false;
  selectedFiche: FicheFrais | null = null;

  constructor(
    private ficheFraisService: FicheFraisService,
    private visiteurService: VisiteurService,
    private etatService: EtatService
  ) {}

  ngOnInit(): void {
    this.visiteurService.consulterVisiteur(2).subscribe(
      (v) => {
        console.log("✅ Visiteur récupéré depuis l'API :", v); // 🔍 Vérifie le contenu de l'objet
        this.visiteur = v;
        if (this.visiteur) {
          this.chargerFiches();
        }
      },
      (error) => console.error('❌ Erreur lors de la récupération du visiteur', error)
    );
  
    this.etatService.getEtats().subscribe(
      (data: Etat[]) => this.etats = data,
      (error) => console.error('Erreur lors de la récupération des états', error)
    );
  }
  

  chargerFiches() {
    if (!this.visiteur) return;
    this.ficheFraisService.getFichesFrais(this.visiteur.id).subscribe(
      (fiches: FicheFrais[]) => this.fichesFrais = fiches,
      (error) => console.error("Erreur lors du chargement des fiches de frais", error)
    );
  }

  afficherAjout() {
    this.ajouterFicheForm = true;
    this.consulterFicheForm = false;
    this.updateFicheForm = false;
    this.selectedFiche = null;
  }

  ajouterFiche() {
    if (!this.visiteur) return;

    const nouvelleFiche: FicheFrais = {
      id: undefined as any,
      visiteur: {
        ...this.visiteur,
      },
      mois: '',
      nbJustificatifs: 0,
      montantValide: 0,
      dateModif: ''
    };

    this.ficheFraisService.ajouterFicheFrais(nouvelleFiche).subscribe(
      () => this.chargerFiches(),
      (err) => console.error('Erreur lors de l\'ajout de la fiche', err)
    );
  }

  updateFiche() {
    if (!this.selectedFiche || !this.visiteur || this.selectedFiche.id === undefined) return;
  
    const ficheMaj: FicheFrais = {
      ...this.selectedFiche,
      visiteur: { 
        id: this.visiteur.id, 
        login: this.visiteur.login, 
        mdp: this.visiteur.mdp,
      },
    };
  
    this.ficheFraisService.updateFicheFrais(ficheMaj.id!, ficheMaj).subscribe(
      () => {
        this.updateFicheForm = false;
        this.chargerFiches();
      },
      (error) => console.error('Erreur lors de la mise à jour de la fiche', error)
    );
  }
  

  supprimerFiche(id: number) {
    if (!confirm('Confirmer la suppression de cette fiche ?')) return;

    this.ficheFraisService.supprimerFicheFrais(id).subscribe(
      () => this.chargerFiches(),
      (error) => console.error('Erreur lors de la suppression de la fiche', error)
    );
  }
}
