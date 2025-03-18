// src/app/fichefrais/fichefrais.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Etat, FicheFrais } from '../client/models/fichefrais';
import { Visiteur } from '../client/models/user'; // Assure-toi d'importer Visiteur correctement
import { EtatService } from '../client/service/etat.service';
import { FicheFraisService } from '../client/service/fichefrais.service';
import { VisiteurService } from '../client/service/visiteur.service';

@Component({
  selector: 'app-fiche-frais',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './fichefrais.component.html',
  styleUrls: ['./fichefrais.component.css'],
})
export class FicheFraisComponent implements OnInit {
  fiche: Partial<FicheFrais> = {};  // Fiche actuellement en modification ou ajout
  fichesFrais: FicheFrais[] = [];   // Liste des fiches de frais

  visiteur: Visiteur | null = null;  // Visiteur actuellement connecté
  etats: Etat[] = [];               // Liste des états disponibles pour la fiche de frais

  ajouterFicheForm = false;         // Affichage formulaire d'ajout
  consulterFicheForm = false;       // Affichage formulaire de consultation
  updateFicheForm = false;          // Affichage formulaire de mise à jour

  selectedFiche: FicheFrais | null = null; // Fiche sélectionnée pour modification ou consultation

  constructor(
    private ficheFraisService: FicheFraisService,
    private visiteurService: VisiteurService,
    private etatService: EtatService
  ) {}

  ngOnInit(): void {
    // Appel pour récupérer un visiteur spécifique
    this.visiteurService.consulterVisiteur(3).subscribe(
      (v) => {
        this.visiteur = v;
        this.chargerFiches(); // Charger les fiches après avoir récupéré le visiteur
      },
      (error) => {
        console.error('Erreur lors de la récupération du visiteur', error);
      }
    );

    // Appel pour récupérer la liste des états
    this.etatService.getEtats().subscribe(
      (data: Etat[]) => {
        this.etats = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des états', error);
      }
    );
  }

  /** 📋 Charger les fiches de frais pour le visiteur */
  chargerFiches() {
    if (!this.visiteur) return;  // Si pas de visiteur, ne pas charger
    this.ficheFraisService.getFichesFrais(this.visiteur.id).subscribe((fiches: FicheFrais[]) => {
        console.log("affichage fiche", fiches);
        this.fichesFrais = fiches;  // Assurer que fiches est bien un tableau
    }, error => {
        console.error("Erreur lors du chargement des fiches de frais", error);
    });
  }

  /** ➕ Afficher le formulaire d'ajout */
  afficherAjout() {
    this.ajouterFicheForm = true;
    this.consulterFicheForm = false;
    this.updateFicheForm = false;
    this.selectedFiche = null;
    this.fiche = {};  // Réinitialiser la fiche
  }

  /** ➕ Ajouter une fiche de frais */
  ajouterFiche() {
    if (!this.visiteur) return; // Vérifier si le visiteur est connecté
    const nouvelleFiche: FicheFrais = {
      id: undefined as any, // À remplacer par une valeur correcte si nécessaire
      nom: this.fiche?.nom ?? '', // Vérification pour éviter undefined
      mois: this.fiche?.mois ?? '',
      nbJustificatifs: this.fiche?.nbJustificatifs ?? 0,
      montantvalide: this.fiche?.montantvalide ?? 0,
      date: new Date().toISOString(),
      description: this.fiche?.description ?? '',

      visiteur: {
        id: this.visiteur?.id ?? 0,  // Associe l'id du visiteur
        login: this.visiteur?.login ?? '',  // Associe le login du visiteur
        mdp: this.visiteur?.mdp ?? '',  // Associe le mot de passe du visiteur
      },

      etat: this.etats?.[0] ?? null, // Vérifie que `etats` n'est pas vide
      ligneFraisForfaits: [],
      ligneFraisHorsForfaits: [],
    };

    this.ficheFraisService.ajouterFicheFrais(nouvelleFiche).subscribe(
      (response) => {
        console.log('Fiche ajoutée avec succès', response);
      },
      (err) => {
        console.error('Erreur lors de l\'ajout de la fiche', err);
      }
    );
  }

  /** 🔄 Mettre à jour une fiche de frais */
  updateFiche() {
    if (!this.selectedFiche || !this.visiteur) return;

    const ficheMaj: FicheFrais = {
      ...this.selectedFiche,
      ...this.fiche,
      visiteur: this.visiteur,  // Associer le visiteur mis à jour
      etat: this.selectedFiche.etat,
      ligneFraisForfaits: this.selectedFiche.ligneFraisForfaits,
      ligneFraisHorsForfaits: this.selectedFiche.ligneFraisHorsForfaits,
    };

    this.ficheFraisService.updateFicheFrais(ficheMaj).subscribe(
      () => {
        this.updateFicheForm = false;  // Fermer le formulaire de mise à jour
        this.chargerFiches();          // Recharger les fiches de frais
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la fiche', error);
      }
    );
  }

  /** 🗑️ Supprimer une fiche de frais */
  supprimerFiche(id: number) {
    if (!confirm('Confirmer la suppression de cette fiche ?')) return;

    this.ficheFraisService.supprimerFicheFrais(id).subscribe(
      () => {
        this.chargerFiches();  // Recharger la liste après la suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de la fiche', error); // Gérer l'erreur
      }
    );
  }
}
