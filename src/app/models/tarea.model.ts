export type Prioridad = 'Alta' | 'Media' | 'Baja';

export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
  completada: boolean;
}
