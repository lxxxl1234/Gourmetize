# Gourmetize

Marketplace para aproximar consumidores e pequenos produtores locais. O projeto possui um frontend React/Vite e uma API Laravel.

## Executar localmente

### API

```bash
cd gourmetize-api
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
php artisan serve
```

Configure um serviço SMTP antes de testar a confirmação de e-mail. O driver `log` é apenas para desenvolvimento.

### Frontend

```bash
npm ci
cp .env.example .env
npm run dev
```

Use `VITE_API_URL=http://127.0.0.1:8000/api` e mantenha `FRONTEND_URL=http://localhost:5173` na API.

## Segurança e dados

- Login usa tokens Laravel Sanctum e o frontend os envia via Bearer token.
- Produtores só podem editar os próprios produtos; consumidores só criam seus pedidos; administrador tem acesso operacional.
- Fotos e documentos enviados são armazenados no disco privado padrão do Laravel.
- Cadastro, login e validação de e-mail possuem limitação de tentativas.
- Em produção, defina `APP_ENV=production`, `APP_DEBUG=false`, `FRONTEND_URL`, `CORS_ALLOWED_ORIGINS` e as credenciais de e-mail.

## API principal

- `POST /api/register`, `POST /api/verify-email`, `POST /api/login`
- `GET /api/products`, `GET|POST /api/products/mine`
- `POST /api/orders`, `GET /api/orders`, `PATCH /api/orders/{id}/status`
