import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Visiteur } from '../client/models/user';
import { VisiteurService } from '../client/service/visiteur.service';

@Component({
  selector: 'app-visiteur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visiteur.component.html',
  styleUrls: ['./visiteur.component.css'],
})
export class VisiteurComponent implements OnInit {

  visiteurs?: Visiteur[];

  constructor(private visiteurService: VisiteurService) {}

  ngOnInit(): void {
    this.chargerVisiteurs();
  }

  // Charger la liste des visiteurs
  chargerVisiteurs() {
    this.visiteurService.listeVisiteur().subscribe({
      next: (prods) => {
        console.log(prods);
        this.visiteurs = prods;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des visiteurs', err);
        alert('Une erreur est survenue lors du chargement des visiteurs');
      }
    });
  }

  // Supprimer un visiteur
  supprimerVisiteur(p: Visiteur) {
    let conf = confirm("Êtes-vous sûr de vouloir supprimer ce visiteur ?");
    if (conf) {
      this.visiteurService.supprimerVisiteur(p.id).subscribe({
        next: () => {
          console.log("Visiteur supprimé");
          this.chargerVisiteurs(); // Recharger la liste des visiteurs
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du visiteur', err);
          alert('Une erreur est survenue lors de la suppression du visiteur');
        }
      });
    }
  }
}
