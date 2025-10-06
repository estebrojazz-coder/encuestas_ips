// src/app/core/datos.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private datos: any = null;   // Guarda datos personales temporalmente

  constructor() {}

  // 👉 Guardar datos personales (desde DatosComponent)
  setDatos(datos: any) {
    this.datos = datos;
  }

  // 👉 Obtener datos guardados
  getDatos() {
    return this.datos;
  }

  // 👉 Combinar con la encuesta y devolver todo
  getEncuestaCompleta(encuesta: any) {
    return {
      ...this.datos,
      ...encuesta
    };
  }

  // 👉 Limpiar (cuando se envía o se refresca)
  clearDatos() {
    this.datos = null;
  }
}
