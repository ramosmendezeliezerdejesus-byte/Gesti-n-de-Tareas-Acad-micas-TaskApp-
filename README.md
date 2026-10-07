# Gestor de tareas

Aplicación híbrida creada con Ionic y Angular para organizar deberes de estudio. Permite registrar tareas con prioridad, marcar tareas como completadas, eliminarlas y conservar la lista en el almacenamiento local del navegador.

## Requisitos

- Node.js 24 LTS o una versión LTS compatible.
- npm (se instala junto con Node.js).
- Git.

## Instalación y ejecución

1. Instala el CLI de Ionic una sola vez:

   ```powershell
   npm install -g @ionic/cli
   ```

2. Clona el repositorio y entra en la carpeta del proyecto:

   ```powershell
   git clone https://github.com/ramosmendezeliezerdejesus-byte/Gesti-n-de-Tareas-Acad-micas-TaskApp-.git
   cd Gesti-n-de-Tareas-Acad-micas-TaskApp-
   ```

3. Instala las dependencias del proyecto:

   ```powershell
   npm install
   ```

4. Inicia la aplicación en modo de desarrollo:

   ```powershell
   ionic serve
   ```

Ionic abrirá la aplicación en el navegador y actualizará la vista cuando guardes cambios en el código. Para detener el servidor, presiona `Ctrl+C` en esa terminal.

## Funciones

- Lista de tareas con título, descripción y prioridad Alta, Media o Baja.
- Formulario modal con validación de título obligatorio y mínimo de cinco caracteres.
- Marcar tareas como completadas o eliminarlas.
- Filtros para ver todas, pendientes o completadas.
- Guardado automático en `localStorage` del navegador.

## Tecnologías

- Ionic 9
- Angular 22 y TypeScript
- Formularios reactivos de Angular
- Capacitor

## Estructura principal

```text
src/app/
  home/                 Pantalla principal y lista de tareas
  models/               Interfaz Tarea y tipo de prioridad
  services/             Estado de tareas y persistencia local
  task-form/            Formulario modal para crear tareas
```
