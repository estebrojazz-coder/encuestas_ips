import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule
  ],
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  form: FormGroup;
  stars = Array(5).fill(0); // ⭐ 5 estrellas

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tipo: ['', Validators.required], // paciente o acompañante
      cedula: [''],
      nombre: [''],
      comentario: [''],
      calificacion: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      nombreAcompanante: [''],
      pacienteCedula: [''],
      pacienteNombre: ['']
    });
  }

  // Métodos para saber el tipo
  esPaciente() {
    return this.form.value.tipo === 'paciente';
  }

  esAcompanante() {
    return this.form.value.tipo === 'acompanante';
  }

  // Seleccionar calificación
  setRating(value: number) {
    this.form.patchValue({ calificacion: value });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Encuesta enviada:', this.form.value);
      alert('✅ Encuesta enviada con éxito');
      this.form.reset({ calificacion: 0 });
    }
  }
}
