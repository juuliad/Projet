import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FicheFrais } from '../../model/fiche-frais';
import { FicheFraisService } from '../../services/fichefrais.service';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'app-consulter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consulter.component.html',
  styleUrls: ['./consulter.component.css']
})
export class ConsulterComponent implements OnInit, OnDestroy {
  fiches: FicheFrais[] = [];
  private userSub: Subscription = new Subscription;
  isLoading = false;

  constructor(
    private ficheFraisService: FicheFraisService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentVisiteur();
    if (currentUser) {
      this.loadFiches(currentUser.id);
    }
    this.userSub = this.userService.getVisiteurConnecte().subscribe({
      next: (visiteur) => {
        if (visiteur) {
          this.loadFiches(visiteur.id);
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

  private loadFiches(visiteurId: number): void {
    this.isLoading = true;
    this.ficheFraisService.getFichesByVisiteurId(visiteurId).subscribe({
      next: (data) => {
        this.fiches = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement fiches:', err);
        this.isLoading = false;
      }
    });
  }
}
