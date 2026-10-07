import { ChangeDetectorRef, Component, NgZone, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ModalController } from '@ionic/angular/lazy';
import { Tarea } from '../models/tarea.model';
import { TareasService } from '../services/tareas.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  private readonly tareasService = inject(TareasService);
  private readonly modalController = inject(ModalController);
  private readonly ngZone = inject(NgZone);
  private readonly changeDetector = inject(ChangeDetectorRef);
  readonly tareas = toSignal(this.tareasService.tareas$, { initialValue: [] as Tarea[] });
  filtro: 'Todas' | 'Pendientes' | 'Completadas' = 'Todas';

  get tareasVisibles(): Tarea[] {
    const tareas = this.tareas();
    if (this.filtro === 'Pendientes') return tareas.filter(tarea => !tarea.completada);
    if (this.filtro === 'Completadas') return tareas.filter(tarea => tarea.completada);
    return tareas;
  }

  get pendientes(): number { return this.tareas().filter(tarea => !tarea.completada).length; }
  get completadas(): number { return this.tareas().filter(tarea => tarea.completada).length; }

  async abrirFormulario(): Promise<void> {
    const modal = await this.modalController.create({
      component: TaskFormComponent,
      breakpoints: [0, 0.72, 0.94],
      initialBreakpoint: 0.72,
      handle: true,
      cssClass: 'task-form-modal',
    });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      this.ngZone.run(() => {
        this.tareasService.agregar(data);
        this.changeDetector.detectChanges();
      });
    }
  }

  alternar(tarea: Tarea): void { this.tareasService.alternarCompletada(tarea.id); }
  eliminar(tarea: Tarea): void { this.tareasService.eliminar(tarea.id); }
  trackById(_index: number, tarea: Tarea): string { return tarea.id; }
}
