import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AjouterComponent } from './client/ajouter/ajouter.component';
import { ConnexionComponent } from './client/connexion/connexion.component';
import { ConsulterComponent } from './client/consulter/consulter.component';

export const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'ajouter', component: AjouterComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'consulter', component: ConsulterComponent },
  {
    path: 'inscription',
    loadComponent: () => import('./client/inscription/inscription.component').then(m => m.InscriptionComponent)
  },
  {
    path: 'ajouter',
    loadComponent: () => import('./client/ajouter/ajouter.component').then(m => m.AjouterComponent)
  },
];
