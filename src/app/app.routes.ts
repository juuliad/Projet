import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterComponent } from './client/ajouter/ajouter.component';
import { ConnexionComponent } from './client/connexion/connexion.component';
import { ConsulterComponent } from './client/consulter/consulter.component';
import { DashboardComponent } from './client/dashboard/dashboard.component';
import { FicheFraisComponent } from './client/fichesfrais/fichesfrais.component';

export const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ajouter', component: AjouterComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'consulter', component: ConsulterComponent },
  { path: 'fichefrais', component: FicheFraisComponent },
  {
    path: 'ajouter',
    loadComponent: () => import('./client/ajouter/ajouter.component').then(m => m.AjouterComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }