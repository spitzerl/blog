# 🚀 VARIABLES DOKPLOY - Configuration exacte

## 📋 Variables à ajouter dans l'interface Dokploy

### 🔧 Onglet "Environment Variables" → Ajoutez EXACTEMENT ces variables :

```env
# Configuration principale
NODE_ENV=production

# Base de données PostgreSQL (SANS caractères spéciaux dans le password)
POSTGRES_USER=bloguser
POSTGRES_PASSWORD=SecurePassword2024BlogProd
POSTGRES_DB=blogdb
DATABASE_URL=postgresql://bloguser:SecurePassword2024BlogProd@postgres:5432/blogdb

# JWT - CHANGEZ ABSOLUMENT CES VALEURS !
JWT_SECRET=YXNkZmphc2tkZmpoa2FzZGZqaGtqYXNkZmtqaGFrc2RmaGtqYXNkZmtqaGFzZGZramhhc2Rma2poYWtm
JWT_EXPIRES_IN=24h
JWT_REFRESH_SECRET=ZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGY=
JWT_REFRESH_EXPIRES_IN=7d

# Administrateur
ADMIN_EMAIL=admin@votredomaine.com
ADMIN_PASSWORD=SuperAdminPassword2024

# Application
BACKEND_PORT=3001
FRONTEND_URL=https://votredomaine.com
SEED_DB=true

# Serveur
DB_HOST=postgres
DB_PORT=5432

# Optionnels
MAX_FILE_SIZE=10485760
UPLOAD_PATH=/app/uploads
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
AUTH_RATE_LIMIT_MAX=5
```

## ⚙️ Configuration Dokploy

### 📊 Onglet "Settings" :
- **Port**: `3000` (port interne du container)
- **Health Check Path**: `/health`
- **Restart Policy**: `unless-stopped`

### 🌐 Onglet "Domains" :
- **Domain**: `votredomaine.com`
- **Port**: `3000` (automatique)
- **HTTPS**: ✅ Activé
- **Redirect HTTP to HTTPS**: ✅ Activé

## ⚠️ SÉCURITÉ CRITIQUE

### 🔐 Avant déploiement, générez de nouveaux secrets :

```bash
# Nouveau JWT_SECRET (256 bits)
openssl rand -base64 64

# Nouveau JWT_REFRESH_SECRET (256 bits)
openssl rand -base64 64

# Nouveau POSTGRES_PASSWORD (complexe)
openssl rand -base64 32
```

### 🔄 Remplacez dans Dokploy :
1. `JWT_SECRET` → Votre nouveau secret généré
2. `JWT_REFRESH_SECRET` → Votre second secret généré  
3. `POSTGRES_PASSWORD` → Votre nouveau mot de passe
4. `DATABASE_URL` → Mettez à jour avec le nouveau password
5. `ADMIN_EMAIL` → Votre vraie adresse email
6. `ADMIN_PASSWORD` → Votre mot de passe admin sécurisé
7. `FRONTEND_URL` → Votre vrai domaine

## 🚀 Ordre de déploiement

1. **Configurez** toutes les variables dans Dokploy
2. **Vérifiez** que docker-compose.prod.yml est sélectionné
3. **Lancez** le déploiement
4. **Surveillez** les logs de build
5. **Testez** l'endpoint /health
6. **Confirmez** l'accès à votre domaine

## ✅ Tests après déploiement

```bash
# Health check
curl https://votredomaine.com/health

# API publique
curl https://votredomaine.com/api/posts

# Login admin  
curl -X POST https://votredomaine.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@votredomaine.com","password":"SuperMotDePasseAdmin2024!@#"}'
```

**Avec PORT=3005, vous devriez éviter le conflit de port sur Dokploy !** 🎯