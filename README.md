# 🎶 CRM для Музыкального клуба (Nuxt 4 + Auth0 + Prisma + PostgreSQL)

## 🚀 Технологии

- **Nuxt 4** + **Nuxt UI** + **TailwindCSS**
- **Auth0** — авторизация (ученики, админы, преподаватели)
- **PostgreSQL** в Docker
- **Prisma ORM**
- **Adminer** (простая web-админка для БД)
- **pnpm** — менеджер пакетов

---

## 📦 Первичная установка

### 1. Клонировать репозиторий

```bash
git clone https://github.com/your/repo.git
cd CRMforMusic
```

🔑 Настройка Auth0

Зарегистрироваться на Auth0
.

Создать Application → Single Page Web App → Vue.js.

В настройках приложения указать:

Allowed Callback URLs: http://localhost:3000

Allowed Logout URLs: http://localhost:3000

Allowed Web Origins: http://localhost:3000

Скопировать Domain и Client ID.

Пример .env

# Auth0

AUTH0_DOMAIN=dev-xxxx.us.auth0.com
AUTH0_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx
AUTH0_AUDIENCE=
AUTH0_ISSUER=https://dev-xxxx.us.auth0.com/

# Database

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/music_club_crm?schema=public"

🐘 PostgreSQL в Docker

В корне есть docker-compose.yml, который поднимет:

Postgres 16

Adminer (http://localhost:8080
)

Запуск:

pnpm db:up

Остановка:

pnpm db:down

🔧 Prisma ORM
Инициализация
pnpm prisma:gen
pnpm prisma:migrate

Открыть Prisma Studio
pnpm prisma:studio

http://localhost:5555

⚡ Автоматический запуск (одна команда)

Мы подготовили скрипты (scripts/setup.ps1 и scripts/setup.sh), которые:

Проверяют наличие .env и .env.db

Устанавливают зависимости (pnpm install)

Поднимают Postgres в Docker

Ждут готовности контейнера

Генерируют Prisma Client

Прогоняют миграции

(опционально) сидят тестовые данные

Запускают nuxt dev

Windows (PowerShell)
pnpm run setup:win

Linux/macOS (bash)
pnpm run setup:unix

🖥️ Запуск Dev-сервера вручную
pnpm dev

http://localhost:3000

📂 Структура проекта
app/
components/
AuthButtons.client.vue # кнопки входа/регистрации
plugins/
auth0.client.ts # плагин Auth0
pages/
index.vue # форма записи + кнопки
server/
api/
public/
trial.post.ts # эндпоинт записи на пробный урок
utils/
db.ts # singleton Prisma client
prisma/
schema.prisma # схема БД
migrations/ # миграции
docker-compose.yml # Postgres + Adminer

✅ Готово

Теперь при открытии http://localhost:3000
вы получаете:

кнопки входа/регистрации через Auth0

форму записи на пробный урок (сохраняет в БД)

возможность смотреть заявки через Prisma Studio или Adminer
