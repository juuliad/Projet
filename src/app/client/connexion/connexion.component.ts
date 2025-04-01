import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'app-connexion',
  standalone: true, // Mode standalone
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Importe les modules nécessaires
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  loginForm!: FormGroup; // Formulaire réactif
  isLoading: boolean = false; // Pour gérer l'état de chargement
  errorMessage: string | null = null; // Pour afficher les messages d'erreur

  constructor(
    private formBuilder: FormBuilder,
    private authService: UserService, // Service d'authentification
    private router: Router // Router pour la redirection
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire réactif
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]], // Champ obligatoire
      password: ['', [Validators.required]] // Champ obligatoire
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Empêche le rechargement de la page

    // Si le formulaire est invalide, on affiche les erreurs
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Active l'état de chargement
    this.isLoading = true;
    this.errorMessage = null;

    // Récupère les valeurs du formulaire
    const username = this.loginForm.get('username')?.value || '';
    const password = this.loginForm.get('password')?.value || '';

    // Appelle le service d'authentification
    this.authService.login(username, password).subscribe({
      next: (visiteur) => {
        if (visiteur) {
          this.authService.setVisiteurConnecte(visiteur);
          console.log('Connexion réussie', this.authService.getVisiteurConnecte());
          this.router.navigate(['/dashboard']); // Redirige vers /dashboard
        } else {
          console.error('Identifiants incorrects:', visiteur);
          alert('Nom d\'utilisateur ou mot de passe incorrect.');
        }
      },
      error: (error) => {
        console.error('Erreur de connexion:', error);
        alert('Une erreur s\'est produite lors de la connexion.');
      }
    });
}}