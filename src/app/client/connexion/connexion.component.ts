import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Assure-toi que CommonModule et ReactiveFormsModule sont bien importés
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  // Utilisateur par défaut pour la validation
  private validUsers = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    // Création du formulaire de connexion avec validation
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();  // Empêcher le rechargement de la page

    // Vérification si le formulaire est valide
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Récupération des valeurs du formulaire
    const { username, password } = this.loginForm.value;

    // Recherche de l'utilisateur valide
    const user = this.validUsers.find(u => u.username === username && u.password === password);

    if (user) {
      // Connexion réussie, redirection vers la page d'accueil
      this.router.navigate(['/accueil']).then(() => {
        console.log('Redirection vers Accueil réussie!');
      }).catch((err) => {
        console.error('Erreur lors de la redirection:', err);
      });
    } else {
      // Si l'utilisateur n'est pas valide
      this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
    }
  }
}
