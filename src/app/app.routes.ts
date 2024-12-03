import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './client/accueil/accueil.component';
import { AjouterComponent } from './client/ajouter/ajouter.component';
import { ConnexionComponent } from './client/connexion/connexion.component';
import { ConsulterComponent } from './client/consulter/consulter.component';
import { InscriptionComponent } from './client/inscription/inscription.component';


export const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full' }, // redirige vers connexion par défaut
  { path: 'ajouter', component: AjouterComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'consulter', component: ConsulterComponent },
  {path: 'accueil', component: AccueilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
