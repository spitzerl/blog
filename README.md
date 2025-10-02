# Blog

![Issues](https://img.shields.io/github/issues/spitzerl/blog)
![Last Commit](https://img.shields.io/github/last-commit/spitzerl/blog)

## Sommaire

1. [Présentation](#présentation)
2. [Fonctionnalités](#fonctionnalités)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Utilisation](#utilisation)
6. [Structure du projet](#structure-du-projet)
7. [Planification du projet](#planification-du-projet)

---

## Présentation

Ce projet est un blog moderne permettant la publication, la gestion et la consultation d'articles. Il est conçu pour être facile à installer, configurer et étendre.

---

## Fonctionnalités

- Création, édition et suppression d'articles
- Gestion des utilisateurs et des rôles
- Système de commentaires
- Recherche et filtrage des articles
- Interface d'administration
- Responsive design

---

## Installation

### Prérequis

- Node.js >= 18.x
- npm ou yarn
- Base de données (ex: PostgreSQL, MongoDB)

### Étapes

```bash
git clone https://github.com/spitzerl/blog.git
cd blog
npm install
```

---

## Configuration

1. Copier le fichier `.env.example` en `.env`
2. Renseigner les variables d'environnement (base de données, port, etc.)

---

## Utilisation

### Démarrer le serveur

```bash
npm run dev
```

Accéder à l'application via [http://localhost:3000](http://localhost:3000).

---

## Structure du projet

```
blog/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── ...
├── public/
├── .env.example
├── package.json
└── README.md
```

---

## Planification du projet

### Front-end

- Mise en place de Next.js avec TypeScript
- Création des pages principales : liste des articles, page d’article, page de connexion
- Composants réutilisables : ArticleCard, CommentSection, Formulaires
- Design minimaliste et responsive (CSS Modules ou Tailwind)
- Gestion de l’état et des appels API (fetch, SWR ou React Query)

### Back-end

- API REST via les routes Next.js (`/api`)
- Logique métier pour la gestion des articles, utilisateurs, commentaires
- Authentification sécurisée (JWT, bcrypt)
- Gestion des rôles et permissions
- Validation des données reçues

### Base de données

- Modélisation avec Prisma et PostgreSQL
- Création des migrations et du fichier `schema.prisma`
- Stockage sécurisé des mots de passe
- Mise en place des relations (utilisateurs, rôles, articles, commentaires)
- Tests et évolutivité du schéma

### Déploiement

- Préparation d’un Dockerfile pour containeriser l’application
- Configuration de Dokploy pour le déploiement sur VPS
- Gestion des variables d’environnement et des secrets
- Documentation pour le déploiement et la maintenance
