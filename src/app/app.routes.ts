import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AjouterComponent } from './client/ajouter/ajouter.component';
import { ConnexionComponent } from './client/connexion/connexion.component';
import { ConsulterComponent } from './client/consulter/consulter.component';
import { ValidationComponent } from './comptable/validation/validation.component';


export const routes: Routes = [

  { path: 'accueil', component: AccueilComponent },
  { path: 'ajouter', component: AjouterComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'consulter', component: ConsulterComponent },
  { path: 'comptable', component: ValidationComponent },
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  {
    path: 'ajouter',
    loadComponent: () => import('./client/ajouter/ajouter.component').then(m => m.AjouterComponent)
  },
];
