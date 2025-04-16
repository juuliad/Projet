import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FicheFrais } from '../../model/fiche-frais';
import { FicheFraisService } from '../../services/fichefrais.service';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'app-ajouter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements OnInit, OnDestroy {
  fiche: FicheFrais = {
    mois: '',
    nbJustificatifs: 0,
    montantValide: 0,
    dateModif: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
    visiteur: {
      id: 0,
      login: '',
      mdp: ''
    }

  };

  // Liste statique des mois en français
  moisDisponibles: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril',
    'Mai', 'Juin', 'Juillet', 'Août',
    'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  private userSub: Subscription = new Subscription;
  isLoading = false;

  constructor(
    private ficheFraisService: FicheFraisService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fiche.mois = this.moisDisponibles[0]; // Mois par défaut = Janvier

    const currentUser = this.userService.getCurrentVisiteur();
    if (currentUser) {
      this.updateVisiteurFields(currentUser);
    }
    this.userSub = this.userService.getVisiteurConnecte().subscribe({
      next: (visiteur) => {
        if (visiteur) {
          this.updateVisiteurFields(visiteur);
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Erreur utilisateur:', err);
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  private updateVisiteurFields(visiteur: any): void {
    this.fiche.visiteur = {
      id: visiteur.id,
      login: visiteur.username || visiteur.login,
      mdp: ''
    };
  }

  onSubmit(): void {
    this.isLoading = true;
    console.log('Envoi de la fiche:', this.fiche);

    this.ficheFraisService.ajouterFicheFrais(this.fiche).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/consulter']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erreur:', error);
        alert('Échec de l\'enregistrement: ' + (error.message || 'Erreur inconnue'));
      }
    });
  }
}
