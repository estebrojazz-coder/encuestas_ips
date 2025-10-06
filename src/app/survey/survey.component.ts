import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { DatosService } from '../core/datos.service';

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
  ],
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  rating = 0;        
  hoverRating = 0;   
  stars = [1, 2, 3, 4, 5];
  surveyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private datosService: DatosService,
    private router: Router
  ) {
    this.surveyForm = this.fb.group({
      // Preguntas
      experiencia: ['', Validators.required], 
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

  ngOnInit() {
    const datosGuardados = this.datosService.getDatos();

    // Si no hay datos en sessionStorage → redirigir a Datos
    if (!datosGuardados) {
      this.router.navigate(['/datos']);
      return;
    }

    console.log('✅ Datos personales cargados:', datosGuardados);
  }

  // ⭐ Seleccionar calificación
  setRating(value: number) {
    this.rating = value;
    this.surveyForm.patchValue({ experiencia: value });
  }

  setHover(value: number) {
    this.hoverRating = value;
  }

  clearHover() {
    this.hoverRating = 0;
  }

  // 🚀 Enviar formulario
 onSubmit() {
  if (this.surveyForm.valid) {
    const encuestaCompleta = this.datosService.getEncuestaCompleta(this.surveyForm.value);
    console.log('✅ Todo listo:', encuestaCompleta);

    // Aquí enviarías a backend
    alert('✅ Encuesta enviada con éxito');

    this.surveyForm.reset();
    this.datosService.clearDatos(); // limpiar memoria
  } else {
    alert('⚠️ Debes completar todos los campos');
  }
}

}
