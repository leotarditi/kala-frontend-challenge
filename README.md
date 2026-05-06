# Kala Users — Frontend Challenge

Aplicación de gestión de usuarios desarrollada como challenge técnico para Kala, consumiendo la API pública de DummyJSON.

El objetivo principal fue priorizar decisiones simples, mantenibles y escalables por sobre sobre-arquitectura innecesaria, separando correctamente estado de servidor, estado de UI y responsabilidades por dominio.

---

## Stack utilizado

* React 19
* TypeScript
* Vite
* Ant Design
* Sass
* React Router
* Redux Toolkit
* TanStack Query
* Axios
* Vitest + Testing Library
* Vercel (deploy)

---

## Funcionalidades implementadas

* Listado de usuarios con paginación server-side (`limit + skip`)
* Búsqueda por nombre con debounce (`400ms`)
* Vista de detalle por usuario (`/users/:id`)
* Edición de usuario con validaciones
* Simulación de PUT sobre DummyJSON
* Loading, error y empty states en todas las vistas
* Responsive básico
* Cache de queries con `staleTime`
* Invalidación automática de cache luego de edición
* Testing de lógica crítica (`useDebounce`, `useUsers`)

---

## Arquitectura

Se utilizó una arquitectura basada en features para mejorar escalabilidad, mantenibilidad y ownership del dominio.

La estructura principal se divide en:

### `app/`

Responsable del bootstrap global de la aplicación:

* store global
* typed hooks de Redux
* providers principales

### `shared/`

Código reutilizable y agnóstico del dominio:

* componentes globales (`LoadingSpinner`, `ErrorDisplay`, `AppLayout`)
* hooks compartidos (`useDebounce`)
* cliente HTTP (`Axios`)
* estilos globales

### `features/users/`

Toda la lógica de negocio relacionada a usuarios:

* pages
* components
* hooks
* api
* store
* types

Esto evita acoplamiento innecesario y facilita escalar nuevas features sin afectar módulos existentes.

---

## Decisiones técnicas

### Redux Toolkit + TanStack Query

Se separó claramente:

* UI State → Redux Toolkit
* Server State → TanStack Query

Redux maneja:

* búsqueda
* paginación
* estado visual de navegación

TanStack Query maneja:

* fetching
* cache
* loading
* refetch
* invalidación de queries
* sincronización con servidor

Esto evita sobrecargar Redux con estado remoto innecesario.

---

### Debounce en búsqueda

Se implementó debounce de `400ms` para evitar requests innecesarias durante la búsqueda.

Además, React Query evita race conditions al invalidar automáticamente queries anteriores.

---

### Query Keys estructuradas

Se utilizaron query keys centralizadas para permitir invalidación granular de cache y actualización eficiente luego de mutaciones.

---

### Separación de responsabilidades

Se evitó que componentes UI concentren demasiada lógica.

Ejemplo:

* definición de columnas de tabla desacoplada de `UserTable`
* hooks sin lógica visual
* services separados de componentes

Esto mejora mantenibilidad y testing.

---

## Testing

Se priorizó testear lógica real por sobre snapshots superficiales.

Actualmente incluye:

### `useDebounce`

* valor inicial
* actualización luego del delay
* cancelación de timeouts anteriores

### `useUsers`

* fetch exitoso
* manejo de errores
* búsqueda usando endpoint correcto

---

## Scripts disponibles

### Desarrollo

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Tests

```bash
npm run test
```

### Tests en watch mode

```bash
npm run test:watch
```

### Coverage

```bash
npm run coverage
```

### Validación completa

```bash
npm run check
```

---

## Instalación

```bash
npm install
npm run dev
```

---

## Deploy

Proyecto deployado en Vercel:

[Kala IA](https://kala-frontend-challenge.vercel.app/users)

---

## Mejoras futuras

Con más tiempo agregaría:

* tests sobre formularios y mutations
* optimistic updates
* skeleton loaders
* lazy loading de rutas
* breadcrumbs
* mejoras de accesibilidad
* E2E tests con Playwright
* Storybook para componentes reutilizables

---

## Nota final

La prioridad de este challenge no fue agregar más features, sino tomar buenas decisiones de arquitectura y mantener una base escalable, simple y defendible en una code review técnica.