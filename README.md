# Orders & Products SPA

Single Page Application for managing Orders and Products.

## Features

- Orders list with detailed view
- Products list with filtering by product type
- Orders contain products
- Order total calculation in multiple currencies
- Real-time active sessions counter (WebSocket)
- Animated route transitions

## Tech Stack

Frontend:

- Vue 3
- TypeScript
- Vuex
- Vue Router
- Bootstrap 5
- Animate.css
- Axios
- Socket.io-client

Backend:

- Node.js
- Express
- Socket.io

Infrastructure:

- Docker
- Docker Compose
- Git

## Project Structure

```text
frontend/   – Vue 3 SPA
backend/    – REST API + WebSocket
```

## Run with Docker
```
docker-compose up --build
```