import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AjouterComponent } from './client/ajouter/ajouter.component';
import { ConnexionComponent } from './client/connexion/connexion.component';
import { ConsulterComponent } from './client/consulter/consulter.component';
import { InscriptionComponent } from './client/inscription/inscription.component';
import { ValidationComponent } from './comptable/validation/validation.component';


export const routes: Routes = [

  { path: 'accueil', component: AccueilComponent },
  { path: 'ajouter', component: AjouterComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'consulter', component: ConsulterComponent },
  { path: 'comptable', component: ValidationComponent },
  {path: 'inscription', component: InscriptionComponent},
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  /*{
    path: 'inscription',
    loadComponent: () => import('./client/inscription/inscription.component').then(m => m.InscriptionComponent)
  },*/
  {
    path: 'ajouter',
    loadComponent: () => import('./client/ajouter/ajouter.component').then(m => m.AjouterComponent)
  },
];
