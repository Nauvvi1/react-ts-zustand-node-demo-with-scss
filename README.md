# React + TypeScript + Zustand + Node.js (Express)

fullstack-пример: фронт на **React + TS + Zustand (Vite)** и бэкенд на **Node.js + Express + TS**.
Присутствует: архитектура, стейт‑менеджмент, валидация, качественные хэндлеры и дев‑сценарии.

## Начать

```bash
# 1) Установить зависимости
cd server && npm i && cd ../client && npm i && cd ..
npm i   # (устанавливает concurrently в корне)

# 2) Переменные (опционально)
cp server/.env.example server/.env

# 3) Запуск фронта и бэка
npm run dev
# Клиент: http://localhost:5173
# API:    http://localhost:4000/api
```

## Стек
- **Client:** React 18, TypeScript, Zustand, Vite
- **Server:** Node.js (Express), TypeScript, Zod (валидация), nanoid, CORS, morgan
- **Dev:** concurrently для одновременного запуска

## API
- `GET    /api/health` — пинг сервера
- `GET    /api/tasks` — список задач
- `POST   /api/tasks` — создать (body: `{ title: string }`)
- `PATCH  /api/tasks/:id` — изменить (body: `{ title?: string, done?: boolean }`)
- `DELETE /api/tasks/:id` — удалить

Данные в демо — **in‑memory**, чтобы запустилось за секунды. Легко заменить на БД/Prisma.

---

MIT © Nauvvi1
