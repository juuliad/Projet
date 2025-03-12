import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ConnexionComponent } from './app/client/connexion/connexion.component'; // Assurez-vous que ConnexionComponent est autonome

bootstrapApplication(ConnexionComponent, appConfig)
  .catch((err) => console.error(err));
