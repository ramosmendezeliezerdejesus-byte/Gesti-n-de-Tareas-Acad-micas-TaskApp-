import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular/lazy';
import { Prioridad } from '../models/tarea.model';

function tituloMinimo(control: AbstractControl): ValidationErrors | null {
  return (control.value as string ?? '').trim().length >= 5 ? null : { minlength: true };
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: false,
})
export class TaskFormComponent {
  readonly form = inject(FormBuilder).nonNullable.group({
    titulo: ['', [Validators.required, tituloMinimo]],
    descripcion: [''],
    prioridad: ['Media' as Prioridad, Validators.required],
  });

  constructor(private readonly modalController: ModalController) {}

  cancelar(): void {
    void this.modalController.dismiss(undefined, 'cancel');
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    void this.modalController.dismiss({
      ...this.form.getRawValue(),
      titulo: this.form.controls.titulo.value.trim(),
      descripcion: this.form.controls.descripcion.value.trim(),
    }, 'confirm');
  }
}
