import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tarea } from '../models/tarea.model';

const STORAGE_KEY = 'gestor-tareas';

@Injectable({ providedIn: 'root' })
export class TareasService {
  private readonly tareasSubject = new BehaviorSubject<Tarea[]>(this.cargarTareas());
  readonly tareas$ = this.tareasSubject.asObservable();

  agregar(tarea: Omit<Tarea, 'id' | 'completada'>): void {
    const nuevas: Tarea[] = [{ ...tarea, id: crypto.randomUUID(), completada: false }, ...this.tareasSubject.value];
    this.guardar(nuevas);
  }

  alternarCompletada(id: string): void {
    this.guardar(this.tareasSubject.value.map(tarea =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea,
    ));
  }

  eliminar(id: string): void {
    this.guardar(this.tareasSubject.value.filter(tarea => tarea.id !== id));
  }

  private cargarTareas(): Tarea[] {
    try {
      const guardadas = localStorage.getItem(STORAGE_KEY);
      return guardadas ? JSON.parse(guardadas) as Tarea[] : [];
    } catch {
      return [];
    }
  }

  private guardar(tareas: Tarea[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
    this.tareasSubject.next(tareas);
  }
}
