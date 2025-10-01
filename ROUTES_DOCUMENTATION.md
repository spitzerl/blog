# 🚀 Liste complète des routes du blog

## 📋 Vue d'ensemble

Le projet utilise deux serveurs :
- **Next.js App Router** (port 3000/3002) : Frontend + API routes
- **Express Backend** (port 3001/3003) : API REST principale

---

## 🌐 Routes Frontend (Next.js)

### Pages principales

| Route | Fichier | Description | Statut |
|-------|---------|-------------|--------|
| `/` | `app/page.tsx` | Page d'accueil (placeholder Next.js) | ✅ Existante |
| `/articles/[id]` | `app/articles/[id]/page.tsx` | Page individuelle d'un article | ✅ Créée |

### API Routes (Next.js)

| Route | Fichier | Méthode | Description | Statut |
|-------|---------|---------|-------------|--------|
| `/api/health` | `app/api/health/route.ts` | `GET` | Health check pour monitoring | ✅ Créée |

---

## 🔧 API REST (Express Backend)

### Posts (Articles)

| Route | Méthode | Description | Paramètres | Réponse |
|-------|---------|-------------|------------|---------|
| `/api/posts` | `GET` | Récupérer tous les articles | - | `Array<Post>` avec auteur et commentaires |
| `/api/posts/:id` | `GET` | Récupérer un article par ID | `id: number` | `Post` avec auteur et commentaires |
| `/api/posts` | `POST` | Créer un nouvel article | `title, content, excerpt?, coverImage?, authorId` | `Post` créé |
| `/api/posts/:id` | `PUT` | Modifier un article | `id: number` + `title?, content?, excerpt?, coverImage?` | `Post` modifié |
| `/api/posts/:id` | `DELETE` | Supprimer un article | `id: number` | `204 No Content` |

---

## 📊 Détail des routes

### 🏠 **Frontend Routes**

#### `GET /` (Page d'accueil)
```typescript
// app/page.tsx
export default function Home() {
  // Page d'accueil avec placeholder Next.js
  return <div>Welcome to Next.js</div>;
}
```
**État** : Page par défaut Next.js, à remplacer par une vraie interface blog

#### `GET /articles/[id]` (Page article)
```typescript
// app/articles/[id]/page.tsx
export default function ArticlePage() {
  // Affichage d'un article avec :
  // - Image de bannière (coverImage)
  // - Contenu Markdown rendu
  // - Métadonnées (auteur, dates)
}
```
**État** : Créée avec composant MarkdownRenderer

### 🔗 **API Routes (Next.js)**

#### `GET /api/health` (Health Check)
```typescript
// app/api/health/route.ts
export async function GET() {
  // Test connexion DB + statut application
  return NextResponse.json({
    status: 'healthy',
    services: { database: 'connected', application: 'running' }
  });
}
```
**Usage** : Monitoring Dokploy, healthchecks Docker

### ⚡ **API REST (Express)**

#### `GET /api/posts` (Liste des articles)
```javascript
app.get('/api/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true, comments: true }
  });
  res.json(posts);
});
```
**Réponse** :
```json
[
  {
    "id": 1,
    "title": "Mon article",
    "content": "# Contenu Markdown...",
    "excerpt": "Résumé de l'article",
    "coverImage": "https://...",
    "createdAt": "2025-10-01T...",
    "updatedAt": "2025-10-01T...",
    "authorId": 1,
    "author": { "id": 1, "email": "admin@example.com" },
    "comments": []
  }
]
```

#### `GET /api/posts/:id` (Article par ID)
```javascript
app.get('/api/posts/:id', async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { author: true, comments: true }
  });
  res.json(post);
});
```

#### `POST /api/posts` (Créer article)
```javascript
app.post('/api/posts', async (req, res) => {
  const { title, content, excerpt, coverImage, authorId } = req.body;
  const post = await prisma.post.create({ data: {...} });
  res.status(201).json(post);
});
```
**Body** :
```json
{
  "title": "Titre de l'article",
  "content": "# Contenu Markdown...",
  "excerpt": "Résumé (optionnel)",
  "coverImage": "https://... (optionnel)",
  "authorId": 1
}
```

#### `PUT /api/posts/:id` (Modifier article)
```javascript
app.put('/api/posts/:id', async (req, res) => {
  const { title, content, excerpt, coverImage } = req.body;
  const post = await prisma.post.update({
    where: { id: parseInt(req.params.id) },
    data: { title, content, excerpt?, coverImage? }
  });
  res.json(post);
});
```

#### `DELETE /api/posts/:id` (Supprimer article)
```javascript
app.delete('/api/posts/:id', async (req, res) => {
  await prisma.post.delete({
    where: { id: parseInt(req.params.id) }
  });
  res.status(204).end();
});
```

---

## 🎯 Routes manquantes (à implémenter)

### Frontend
- [ ] `/articles` - Liste des articles
- [ ] `/admin` - Interface d'administration
- [ ] `/login` - Page de connexion
- [ ] `/about` - À propos

### API (Express)
- [ ] `/api/auth/login` - Authentification
- [ ] `/api/auth/logout` - Déconnexion
- [ ] `/api/users` - Gestion utilisateurs
- [ ] `/api/comments` - CRUD commentaires
- [ ] `/api/roles` - Gestion des rôles

### API (Next.js)
- [ ] `/api/posts` - Migration depuis Express
- [ ] `/api/auth/[...nextauth]` - NextAuth.js
- [ ] `/api/upload` - Upload d'images

---

## 🔌 URLs d'accès

### Développement local
- **Frontend** : http://localhost:3002
- **Backend API** : http://localhost:3003

### Docker
- **Frontend** : http://localhost:3000 (prod) / 3002 (dev)
- **Backend API** : http://localhost:3001 (prod) / 3003 (dev)

### Production (Dokploy)
- **Application** : https://votre-domaine.com
- **API** : https://votre-domaine.com/api/*

---

## 🧪 Test des routes

```bash
# Health check
curl http://localhost:3003/api/health

# Liste des articles
curl http://localhost:3003/api/posts

# Article par ID
curl http://localhost:3003/api/posts/1

# Créer un article
curl -X POST http://localhost:3003/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"# Hello","authorId":1}'

# Modifier un article
curl -X PUT http://localhost:3003/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Titre modifié"}'

# Supprimer un article
curl -X DELETE http://localhost:3003/api/posts/1
```

---

## 📝 Notes techniques

- **Markdown** : Contenu stocké en Markdown, rendu avec `react-markdown`
- **Images** : URLs externes (Unsplash, etc.) via `coverImage`
- **Base de données** : PostgreSQL avec Prisma ORM
- **Authentication** : À implémenter (JWT + bcrypt)
- **Validation** : À implémenter (Zod recommandé)