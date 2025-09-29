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
