# 🎶 CRM для Музыкального клуба (Nuxt 4 + Auth0 + Prisma + PostgreSQL)

## 🚀 Технологии

- **Nuxt 4** + **Nuxt UI** + **TailwindCSS**
- **Auth0** — авторизация (ученики, админы, преподаватели)
- **PostgreSQL** в Docker
- **Prisma ORM**
- **Directus** — headless CMS и файловое хранилище
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

Пример `.env` находится в файле `.env.example`. После создания static token в
Directus заполните переменную `DIRECTUS_TOKEN`.

🐘 PostgreSQL и Directus в Docker

В корне есть docker-compose.yml, который поднимет:

- Postgres 16
- Directus (http://localhost:8055)
- сервис `backup` для дампов БД в `./backups`

Запуск:

```bash
docker compose up -d
```

Остановка:

```bash
docker compose down
```

Ручной бэкап:

```bash
docker compose run --rm backup
```

После запуска откройте `http://localhost:8055` и войдите с
`DIRECTUS_ADMIN_EMAIL` / `DIRECTUS_ADMIN_PASSWORD`. Затем создайте static token
(`Settings → Users → Tokens`) с именем `nuxt-service-token` и сохраните его в `.env` как `DIRECTUS_TOKEN`.

🔧 Prisma ORM
Инициализация
pnpm prisma:gen
pnpm prisma:migrate

Открыть Prisma Studio
pnpm prisma:studio

http://localhost:5555

⚡ Автоматический запуск (одна команда)

Мы подготовили скрипты (scripts/setup.ps1 и scripts/setup.sh), которые:

Проверяют наличие .env

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
docker-compose.yml # Postgres + Directus + backup

✅ Готово

Теперь при открытии http://localhost:3000
вы получаете:

кнопки входа/регистрации через Auth0

форму записи на пробный урок (сохраняет в БД)

возможность смотреть заявки через Prisma Studio или Directus
