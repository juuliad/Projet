import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajouter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent {
  fraisForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.fraisForm = this.fb.group({
      libelle: ['', Validators.required],
      montant: [null, [Validators.required, Validators.min(0)]],
      date: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.fraisForm.valid) {
      const noteDeFrais = this.fraisForm.value;
      console.log('Nouvelle note de frais ajoutée :', noteDeFrais);
      alert(`La note de frais "${noteDeFrais.libelle}" de ${noteDeFrais.montant}€ a été ajoutée avec succès !`);
      this.fraisForm.reset();
    }
  }
}
