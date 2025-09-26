import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    NgClass
  ],
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  surveyForm: FormGroup;
  rating: number = 0; // ⭐ Estrellas seleccionadas

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      sede: ['', Validators.required],
      nombres: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      telefono: ['', Validators.required],
      tipoServicio: ['', Validators.required],

      // Preguntas
      experiencia: ['', Validators.required],        // ⭐ calificación
      recomendacion: ['', Validators.required],
      tiempoEspera: ['', Validators.required],
      diasCita: ['', Validators.required],
      tratoRespetuoso: ['', Validators.required],
      examenFisico: ['', Validators.required],
      explicacionClara: ['', Validators.required],
      educacionOrientacion: ['', Validators.required],
      higiene: ['', Validators.required],
      servicioOrdenado: ['', Validators.required],
      tiempoTerapias: ['', Validators.required],

      // Otros campos
      observaciones: [''],
      personaEncuesta: ['']
    });
  }

  // Manejo de estrellas ⭐
  setRating(value: number) {
    this.rating = value;
    this.surveyForm.patchValue({ experiencia: value });
  }

  // Enviar formulario
  onSubmit() {
    if (this.surveyForm.valid) {
      console.log('✅ Datos enviados:', this.surveyForm.value);
      alert('✅ Encuesta enviada con éxito');
      this.surveyForm.reset();
      this.rating = 0;
    } else {
      alert('⚠️ Debes completar todos los campos obligatorios');
    }
  }
}
