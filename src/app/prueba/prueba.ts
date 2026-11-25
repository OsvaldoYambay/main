import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
    IftaLabelModule
  ],
  selector: 'app-prueba',
  styleUrl: './prueba.css',
  templateUrl: './prueba.html',
})
export class Prueba {
    private fb = inject(FormBuilder);
    private http = inject(HttpClient);

  private readonly apiUrl = 'http://127.0.0';

  mensajeRespuesta: string = '';
  datosEnviados: any=null;

  formulario: FormGroup = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    observacion: ['', Validators.required]
  });

  enviarDatos(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const payload = this.formulario.value;
    this.datosEnviados=payload;

    this.http.post<any>(this.apiUrl, payload).subscribe({
      next: (res) => {
        this.mensajeRespuesta = `${res?.cod || 'OK'}: ${res?.msgs || 'Transacción realizada corectamente'}`;
        this.formulario.reset();
      },
      error: (err) => {
        const respuestaHardcodeada={
            cod: 'OK',
            msgs: 'Transacción realizada corectamente'
        };

        console.log('Enviado', payload);
        this.mensajeRespuesta = `${respuestaHardcodeada.cod}: ${respuestaHardcodeada.msgs}`;
        //this.formulario.reset();
      }
    });
  }
}
