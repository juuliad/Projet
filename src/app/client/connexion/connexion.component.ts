import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Optionnel, si tu utilises le routage
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-connexion',
  standalone: true, // Mode standalone
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Importe les modules nécessaires
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

export class ConnexionComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: UserService, // Injecte le service
    private router: Router // Injecte le Router pour la redirection
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire réactif
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Empêche le rechargement de la page

    if (this.loginForm.invalid) {
      // Marque tous les champs comme touchés pour afficher les messages d'erreur
      this.loginForm.markAllAsTouched();
      return;
    }

    // Récupère les valeurs du formulaire
    const username = this.loginForm.get('username')?.value || '';
    const password = this.loginForm.get('password')?.value || '';

    // Appelle le service d'authentification
    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log('Connexion réussie:', response);
        // Redirige l'utilisateur après une connexion réussie
        this.router.navigate(['/dashboard']); // Remplace '/dashboard' par la route souhaitée
      },
      error: (error) => {
        console.error('Erreur de connexion:', error);
        // Affiche un message d'erreur à l'utilisateur
        alert('Nom d\'utilisateur ou mot de passe incorrect.');
      }
    });
  }
}
