# Mercatum Regni — APIs y flujo de datos

## 1. FakeAPI Platzi (productos y usuarios)

- Base: `https://api.escuelajs.co/api/v1`
- Documentación: https://fakeapi.platzi.com/en/rest/products/ y `/users/`
- Capa de datos: `src/lib/platzi.ts` (tipos `Product`, `User`, `Category` y helpers).

| Operación | Método y ruta |
| --- | --- |
| Listar productos | `GET /products?offset=0&limit=40` |
| Categorías | `GET /categories?limit=12` |
| Crear producto | `POST /products/` |
| Editar producto | `PUT /products/{id}` |
| Borrar producto | `DELETE /products/{id}` |
| Listar usuarios | `GET /users?limit=20` |
| Crear usuario | `POST /users/` |
| Editar usuario | `PUT /users/{id}` |
| Borrar usuario | `DELETE /users/{id}` |

Flujo:

1. Las rutas `/`, `/tienda` y `/usuarios` consultan la API con TanStack Query
   (`useQuery`, `staleTime` de 5 min).
2. La lista renderizada se guarda en estado local para poder reconciliar altas,
   ediciones y bajas inmediatamente después de cada mutación.
3. La API es una demo pública: algunas escrituras no se persisten. En ese caso la
   UI aplica el cambio en la sesión y muestra un aviso del escribano explicándolo.
4. `firstImage()` normaliza las URLs de imagen defectuosas del dataset y cae en los
   grabados locales del proyecto para evitar imágenes roturas.
5. La portada pide hasta 50 productos, los ordena por precio descendente y muestra
   los 5 más caros en el carrusel. Si la API falla, usa un archivo local de respaldo.

## 2. Open-Meteo (clima en la cabecera)

- Endpoint: `https://api.open-meteo.com/v1/forecast`
- Parámetros: `latitude`, `longitude`, `current=temperature_2m,weather_code,is_day`,
  `timezone=auto`
- Documentación: https://open-meteo.com/en/docs
- Sin clave de API.
- Código: `src/lib/weather.ts` (mapa de códigos WMO a etiquetas en español) y
  `src/components/medieval/WeatherWidget.tsx`.

Flujo:

1. El widget pide geolocalización del navegador; si se deniega o falla, usa
   Sevilla (37.3891, -5.9845).
2. Refresca el clima cada 10 minutos y la hora local cada 15 segundos.
3. Estados de carga y error se muestran en el mismo lenguaje visual medieval.

## 3. Estructura

```
src/
  components/medieval/   PageShell (header + main + footer), SiteNav, SiteFooter,
                         WeatherWidget, HeroCarousel, parts (botones, diálogo, campos)
  lib/platzi.ts          modelos y CRUD de FakeAPI Platzi
  lib/weather.ts         Open-Meteo y códigos WMO
  routes/                /, /vendedores, /historia, /tienda, /usuarios
```

## 4. No verificable desde este repositorio

Figma, Jira, GitHub y el despliegue en Vercel son entregables externos y no se
pueden dar por completados desde este proyecto.
