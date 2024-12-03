import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccueilComponent } from './client/accueil/accueil.component';
import { AjouterComponent } from './client/ajouter/ajouter.component';
import { ConnexionComponent } from './client/connexion/connexion.component';
import { ConsulterComponent } from './client/consulter/consulter.component';
import { InscriptionComponent } from './client/inscription/inscription.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AjouterComponent, ConsulterComponent, ConnexionComponent, InscriptionComponent, AccueilComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NoteFrais';
}
