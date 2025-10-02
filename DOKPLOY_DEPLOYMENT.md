# 🚀 Guide de déploiement Dokploy

## 📋 Prérequis

- Compte Dokploy configuré
- Domaine pointant vers votre serveur Dokploy
- Repository Git accessible

## 🔧 Configuration Dokploy

### 1. Création du projet

Dans l'interface Dokploy :

1. **Nouveau projet** → "Docker Compose"
2. **Repository** : `https://github.com/spitzerl/blog.git`
3. **Branche** : `develop` (ou `main`)
4. **Dockerfile** : `docker-compose.prod.yml`

### 2. Variables d'environnement

Configurez ces variables dans l'interface Dokploy :

```env
# Base de données (OBLIGATOIRE)
POSTGRES_PASSWORD=VotreMotDePasseSecurise123!
POSTGRES_USER=bloguser
POSTGRES_DB=blogdb

# Admin (OBLIGATOIRE)
ADMIN_EMAIL=admin@votre-domaine.com
ADMIN_PASSWORD=VotreMotDePasseAdmin123!

# Sécurité (OBLIGATOIRE - Générez une clé forte)
JWT_SECRET=votre-cle-jwt-ultra-secrete-64-caracteres-minimum

# Optionnel
SEED_DB=false
NODE_ENV=production
```

### 3. Configuration du domaine

1. **Domaine** : `blog.votre-domaine.com`
2. **SSL** : Activé (Let's Encrypt automatique)
3. **Port** : `3000` (port standard de l'app)

## 🎯 Architecture de déploiement

```
Internet → Dokploy (Nginx) → Container App (port 3000) → Container PostgreSQL
```

- **Dokploy** gère automatiquement :
  - Reverse proxy avec Nginx
  - Certificats SSL (Let's Encrypt)
  - Redirection HTTP → HTTPS
  - Load balancing si nécessaire

## 📝 Checklist de déploiement

### Avant le déploiement

- [ ] Variables d'environnement configurées
- [ ] Domaine DNS configuré
- [ ] Repository accessible
- [ ] Branch `develop` à jour

### Pendant le déploiement

- [ ] Build Docker réussi
- [ ] Migration Prisma appliquée
- [ ] Health check vert (`/api/health`)
- [ ] SSL activé

### Après le déploiement

- [ ] Site accessible via HTTPS
- [ ] API fonctionnelle (`/api/posts`)
- [ ] Base de données connectée
- [ ] Logs sans erreurs

## 🔍 Vérification post-déploiement

```bash
# Test du health check
curl https://blog.votre-domaine.com/api/health

# Test de l'API
curl https://blog.votre-domaine.com/api/posts

# Vérification SSL
curl -I https://blog.votre-domaine.com
```

## 📊 Monitoring

### Logs Dokploy

- **Application** : Logs en temps réel dans l'interface
- **Build** : Historique des déploiements
- **Système** : Métriques serveur

### Health checks

- **Endpoint** : `/api/health`
- **Fréquence** : 30s
- **Timeout** : 10s

## 🚨 Résolution de problèmes

### Erreur de build

```bash
# Vérifier les logs de build
# Souvent lié aux variables d'environnement manquantes
```

### Base de données inaccessible

```bash
# Vérifier POSTGRES_PASSWORD
# Vérifier la connectivité réseau interne
```

### SSL non activé

```bash
# Vérifier la configuration DNS
# Attendre la propagation (jusqu'à 24h)
```

## 🔄 Mise à jour

1. **Push** sur la branche `develop`
2. **Redéploiement automatique** ou manuel via Dokploy
3. **Vérification** du health check

## 🔒 Sécurité

### Variables sensibles

- ✅ Toutes les variables sensibles dans Dokploy (chiffrées)
- ✅ Pas de credentials dans le code
- ✅ JWT secret fort (64+ caractères)

### Réseau

- ✅ PostgreSQL non exposé publiquement
- ✅ HTTPS forcé
- ✅ Communication interne chiffrée

---

**💡 Astuce** : Dokploy gère automatiquement les ports et reverse proxy. Pas besoin de configuration manuelle !

**🎉 Une fois déployé, votre blog sera accessible sur `https://blog.votre-domaine.com` ! 🚀**