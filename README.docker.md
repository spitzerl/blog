# 🐳 Docker Setup - Blog

Ce guide vous explique comment utiliser Docker avec le projet blog.

## 📋 Prérequis

- Docker Engine 20.10+
- Docker Compose V2
- Make (optionnel, pour simplifier les commandes)

## 🚀 Démarrage rapide

### Développement

```bash
# Avec Docker Compose
docker-compose up --build

# Ou avec Make
make dev

# Ou avec npm
npm run docker:dev
```

### Production

```bash
# Avec Docker Compose
docker-compose -f docker-compose.prod.yml up --build -d

# Ou avec Make
make prod

# Ou avec npm
npm run docker:prod
```

## 📁 Structure Docker

```
├── Dockerfile              # Multi-stage pour dev et prod
├── docker-compose.yml      # Configuration développement
├── docker-compose.prod.yml # Configuration production
├── docker-entrypoint.sh    # Script de démarrage
├── .dockerignore           # Exclusions pour le build
├── .env.docker             # Variables d'environnement dev
├── .env.docker.prod        # Variables d'environnement prod
└── Makefile                # Commandes simplifiées
```

## 🎯 Services

| Service | Port | Description |
|---------|------|-------------|
| **web** | 3000 | Application Next.js + Backend Express |
| **postgres** | 5432 | Base de données PostgreSQL |
| **prisma-studio** | 5555 | Interface Prisma (optionnel) |

## 🛠 Commandes Make

```bash
make help           # Affiche toutes les commandes disponibles
make dev            # Développement (premier plan)
make dev-d          # Développement (arrière-plan)
make prod           # Production
make stop           # Arrêter tous les services
make logs           # Voir les logs
make shell          # Accès shell au conteneur
make db-shell       # Accès PostgreSQL
make prisma-studio  # Lancer Prisma Studio
make clean          # Nettoyer tout
make demo           # Démo complète
```

## 📝 Scripts npm

```bash
npm run docker:dev      # Développement
npm run docker:prod     # Production  
npm run docker:stop     # Arrêter
npm run docker:clean    # Nettoyer
npm run docker:logs     # Logs
npm run prisma:studio   # Prisma Studio
```

## 🔧 Configuration

### Variables d'environnement

**Développement** (`.env.docker`):
```env
DATABASE_URL=postgresql://bloguser:blogpassword@postgres:5432/blogdb
NODE_ENV=development
SEED_DB=true
```

**Production** (`.env.docker.prod`):
```env
DATABASE_URL=postgresql://bloguser:CHANGE_PASSWORD@postgres:5432/blogdb
NODE_ENV=production
SEED_DB=false
JWT_SECRET=CHANGE_THIS_SECRET
```

### Personnalisation

1. **Modifier les ports** dans `docker-compose.yml`
2. **Changer les credentials** dans les fichiers `.env.docker*`
3. **Ajuster les ressources** si nécessaire

## 🐛 Résolution de problèmes

### Problèmes courants

**Port déjà utilisé**:
```bash
# Vérifier les ports occupés
sudo netstat -tlnp | grep :3000

# Changer le port dans docker-compose.yml
ports:
  - "3001:3000"  # Port local:conteneur
```

**Base de données non accessible**:
```bash
# Vérifier les logs
make logs-db

# Recréer les volumes
make clean
make dev
```

**Build qui échoue**:
```bash
# Nettoyer complètement
make prune
docker build --no-cache -t blog-app .
```

### Debugging

```bash
# Accéder au conteneur
make shell

# Voir les logs en temps réel
make logs

# Vérifier l'état des services
make status

# Tester la connectivité
docker-compose exec web curl http://localhost:3000
```

## 🚀 Déploiement

### Avec Docker Compose (simple)

```bash
# Sur le serveur
git clone <repo>
cd blog
cp .env.docker.prod .env
# Modifier .env avec vos vraies valeurs
make prod
```

### Avec Docker Swarm ou Kubernetes

Le Dockerfile est optimisé pour les orchestrateurs :
- Image multi-stage
- Utilisateur non-root
- Healthchecks
- Configuration par variables d'environnement

## 📊 Monitoring

### Logs

```bash
# Tous les services
docker-compose logs -f

# Service spécifique
docker-compose logs -f web
docker-compose logs -f postgres
```

### Métriques

```bash
# Stats des conteneurs
docker stats

# Espace disque
docker system df
```

## 🔒 Sécurité

**⚠️ Important pour la production** :

1. **Changer tous les mots de passe par défaut**
2. **Générer un JWT_SECRET fort**
3. **Ne pas exposer PostgreSQL publiquement**
4. **Utiliser HTTPS (voir nginx dans docker-compose.prod.yml)**
5. **Sauvegarder régulièrement la base de données**

## 📚 Ressources

- [Documentation Docker](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/)
- [Next.js Docker](https://nextjs.org/docs/deployment#docker-image)
- [Prisma Docker](https://www.prisma.io/docs/guides/deployment/deploying-to-docker)