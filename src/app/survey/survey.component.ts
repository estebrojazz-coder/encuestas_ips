import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

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
    MatCardModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  form: FormGroup;
  stars = Array(5).fill(0); // ⭐ 5 estrellas

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      tipo: ['', Validators.required],

      // Paciente
      tipoDocumento: [''],
      cedula: [''],
      nombre: [''],

      // Teléfono (siempre requerido)
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],

      // Acompañante
      nombreAcompanante: [''],
      tipoDocumentoPaciente: [''],
      pacienteCedula: [''],
      pacienteNombre: [''],

      // Calificación + comentario
      comentario: [''],
      calificacion: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
    });

    // Detectar cambios en el tipo de rol
    this.form.get('tipo')?.valueChanges.subscribe(tipo => {
      this.onTipoChange(tipo);
    });
  }

  // Activar validadores dinámicos
  onTipoChange(tipo: string) {
    if (tipo === 'paciente') {
      // ✅ Paciente: solo estos campos obligatorios
      this.setRequired(['tipoDocumento', 'cedula', 'nombre']);
      this.clearRequired(['nombreAcompanante', 'tipoDocumentoPaciente', 'pacienteCedula', 'pacienteNombre']);
    } else if (tipo === 'acompanante') {
      // ✅ Acompañante: solo estos campos obligatorios
      this.setRequired(['nombreAcompanante', 'tipoDocumentoPaciente', 'pacienteCedula', 'pacienteNombre']);
      this.clearRequired(['tipoDocumento', 'cedula', 'nombre']);
    }
  }

  // Métodos utilitarios para asignar/quitar required
  private setRequired(fields: string[]) {
    fields.forEach(f => {
      this.form.get(f)?.setValidators([Validators.required]);
      this.form.get(f)?.updateValueAndValidity();
    });
  }

  private clearRequired(fields: string[]) {
    fields.forEach(f => {
      this.form.get(f)?.clearValidators();
      this.form.get(f)?.updateValueAndValidity();
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

  // Enviar formulario
  onSubmit() {
    if (this.form.valid) {
      console.log('Encuesta enviada:', this.form.value);
      alert('✅ Encuesta enviada con éxito');
      this.form.reset({ calificacion: 0 });
    } else {
      alert('⚠️ Por favor completa todos los campos obligatorios.');
    }
  }
}
