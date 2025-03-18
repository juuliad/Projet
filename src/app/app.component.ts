import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AjouterComponent } from './client/ajouter/ajouter.component';
import { ConsulterComponent } from './client/consulter/consulter.component';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConnexionComponent } from './client/connexion/connexion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AjouterComponent, ConsulterComponent, AccueilComponent, ReactiveFormsModule, CommonModule, ConnexionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'NoteFrais';
}
