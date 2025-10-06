import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { DatosService } from '../core/datos.service';

@Component({
  selector: 'app-datos',
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
    NgFor,
    NgClass
  ],
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.css']
})
export class DatosComponent {
  rating = 0;        // Calificación guardada
  hoverRating = 0;   // Calificación en hover
  stars = [1, 2, 3, 4, 5];
  datosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datosService: DatosService
  ) {
    this.datosForm = this.fb.group({
      sede: ['', Validators.required],
      nombres: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      tipoUsuario: ['', Validators.required],
      telefono: ['', Validators.required],
      tipoServicio: ['', Validators.required],
      experiencia: ['', Validators.required]  // ⭐ agregado
    });
  }

  // ⭐ Seleccionar calificación
  setRating(value: number) {
    this.rating = value;
    this.datosForm.patchValue({ experiencia: value });
  }

  setHover(value: number) {
    this.hoverRating = value;
  }

  clearHover() {
    this.hoverRating = 0;
  }

  // 🚀 pasar a preguntas
  onSubmit() {
    if (this.datosForm.valid) {
      // ✅ Guardar datos en el servicio
      this.datosService.setDatos(this.datosForm.value);

      // ✅ Mensaje de confirmación
      alert('✅ Datos guardados con éxito, ahora responde la encuesta');

      // 👉 Redirigir a encuesta
      this.router.navigate(['/encuesta']);
    } else {
      alert('⚠️ Debes completar todos los campos obligatorios');
    }
  }
}
