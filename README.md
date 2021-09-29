# My Pokemon Collection Demo

Sample CRUD with 3rd party API integration

---

## About Stack

- Backend - PHP Laravel.
- Frontend - VueJS.

## Setting Up:

---

### Backend:

Note: Can use docker just go to `backend` folder then `docker-compose up -d`

**[Dockerize]**

1. _[terminal]_ Go to `backend` folder
2. `docker-compose exec app bash`
3. `composer install`
4. Copy `env.example` to `.env`
5. `php artisan key:generate`
6. `php artisan config:cache`
7. `php arisan migrate`
8. Serve in http://localhost

_Note: DB_HOST=db | DB_PASSWORD=secret_

---

### Frontend:

1. _[terminal]_ Go to `frontend/app` folder
2. `npm install`
3. On `npm run serve` (http://localhost:8080)

_Note: `backend should be serve @ http://localhost`_

# Features:

1. Simple management of records
2. Stripe Payment Integration (Test Mode)
3. Pokemon API Integration (https://pokeapi.co/)
