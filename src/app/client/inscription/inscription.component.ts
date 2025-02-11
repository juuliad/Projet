import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../service/user.service';

interface SignupForm {
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
}

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent implements OnInit {
  signupForm: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signupForm = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        role: ['', Validators.required],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
  }

  ngOnInit(): void {
    console.log('Composant Inscription chargé');
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    this.formSubmitted = true;
    console.log('Formulaire soumis', this.signupForm.valid);
    if (this.signupForm.invalid) {
      console.log("ko");
      return;
    }

    const signupData = this.signupForm.value;
    console.log("ok", signupData);

    this.userService.register(signupData).subscribe(
      (data) => {
        console.log('Inscription réussie', data);
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      },
      (err) => {
        console.log('Erreur lors de l\'inscription', err);
        alert('Une erreur est survenue, veuillez réessayer.');
      }
    );
  }
}


