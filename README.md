# Comparativa de Bun-Node-AWS

Este proyecto compara el rendimiento y características de Bun, Node.js y AWS para diversas tareas.

## Requisitos

- Node.js >= 22.0.0
- npm >= 10.2.0

## Instalación

```bash
npm install
```

Para que `image-resizer` funcione en AWS Lambda ejecute:

## Estructura del Proyecto

Este es un monorepo con los siguientes paquetes:

- `packages/xml-parser`: Comparativa de análisis XML
- `packages/image-resizer`: Comparativa de redimensionamiento de imágenes
- `packages/dijsktra-solver`: Comparativa de implementación del algoritmo de Dijkstra

## Benchmarking

El directorio `benchmarking/` contiene herramientas y scripts para realizar pruebas de rendimiento de cada implementación:

- `benchmarking/xml-parser/`: Pruebas de rendimiento para el analizador XML
- `benchmarking/image-resizer/`: Pruebas de rendimiento para el redimensionador de imágenes
- `benchmarking/dijkstra-solver/`: Pruebas de rendimiento para el algoritmo de Dijkstra

Cada carpeta contiene subcarpetas específicas para cada entorno (bun-lambda, node-lambda) con:
- Scripts de prueba basados en autocannon
- Resultados de pruebas en formato JSON
- Archivos CSV con resultados de análisis de logs

Para ejecutar las pruebas de rendimiento, navegue a la carpeta correspondiente y ejecute:

```bash
node index.js
```

## ESLint y Prettier

Este proyecto utiliza ESLint y Prettier para mantener la calidad del código y un estilo consistente.

### Scripts Disponibles

- `npm run lint`: Ejecutar ESLint en todos los archivos
- `npm run lint:fix`: Ejecutar ESLint y corregir problemas automáticamente
- `npm run format`: Formatear todos los archivos con Prettier
- `npm run format:check`: Comprobar si los archivos están correctamente formateados

### Integración con VS Code

Para la mejor experiencia de desarrollo con VS Code:

1. Instale las siguientes extensiones:
   - ESLint (`dbaeumer.vscode-eslint`)
   - Prettier (`esbenp.prettier-vscode`)

2. El repositorio incluye configuraciones para VS Code que:
   - Formatean archivos al guardar usando Prettier
   - Ejecutan correcciones de ESLint al guardar
   - Aplican configuraciones consistentes entre desarrolladores

## Pasos para crear una capa de bun en AWS

<https://learnaws.io/blog/bun-aws-lambda>

## Docker

- Url: `256727551815.dkr.ecr.us-east-2.amazonaws.com`
- Crear repositorio: `aws ecr create-repository --repository-name <package-name>-<runtime>`
- Construir Imagen: `docker build -t dijkstra-solver-bun -f packages/dijkstra-solver/container/Dockerfile.bun packages/dijkstra-solver/`
- Etiquetar Imagen: `docker tag dijkstra-solver-bun:latest 256727551815.dkr.ecr.us-east-2.amazonaws.com/dijkstra-solver-bun:latest`
- Iniciar sesión en AWS ECR: `aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 256727551815.dkr.ecr.us-east-2.amazonaws.com`
- Subir Imagen: `docker push 256727551815.dkr.ecr.us-east-2.amazonaws.com/dijkstra-solver-bun:latest`

## Licencia

ISC
