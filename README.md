# Boxes2 Inventory App

A multi-user inventory management application built with [Laravel](https://laravel.com), [Inertia](https://inertiajs.com), and [React](https://react.dev).

## Features

- **User authentication** — Registration, login, email verification, password reset, two-factor authentication (2FA/TOTP), and passkeys (WebAuthn)
- **Box management** — Create, edit, and delete storage boxes with weight tracking
- **Item management** — Add, edit, delete, and move items between boxes
- **All Items view** — Paginated view of every item across all boxes
- **Printable labels** — Generate PDF labels with QR codes linking to each box's item list
- **Multi-user safe** — All data is scoped to the authenticated user via Laravel policies

## Requirements

- PHP 8.3+
- Node.js 20+
- Composer
- SQLite (or database of your choice)

## Installation

```bash
# Clone the repository
git clone <repository-url> boxes2
cd boxes2

# Install PHP dependencies
composer install

# Install JavaScript dependencies
npm install

# Copy environment file and generate app key
cp .env.example .env
php artisan key:generate

# Edit .env with your database and app settings, then run migrations
php artisan migrate

# Build frontend assets
npm run build
```

## Development

```bash
# Start the PHP development server
php artisan serve --host=0.0.0.0 --port=8082

# In a separate terminal, start Vite for hot-reloading
npm run dev
```

## Testing

```bash
php artisan test
```

## License

MIT

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
