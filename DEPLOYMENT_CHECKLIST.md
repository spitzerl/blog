# ✅ CHECKLIST DE DÉPLOIEMENT DOKPLOY

## 🔧 Pré-déploiement
- [ ] Variables d'environnement configurées dans Dokploy
- [ ] JWT_SECRET changé (256+ bits)
- [ ] POSTGRES_PASSWORD sécurisé
- [ ] ADMIN_PASSWORD complexe
- [ ] Domaine configuré avec HTTPS
- [ ] Branch `develop` à jour

## 🚀 Déploiement
- [ ] Application créée dans Dokploy
- [ ] Repository Git connecté
- [ ] docker-compose.prod.yml sélectionné
- [ ] Variables d'environnement saisies
- [ ] Domaine configuré
- [ ] Build lancé avec succès

## ✅ Post-déploiement
- [ ] Application accessible via HTTPS
- [ ] Health check `/health` répond 200
- [ ] Base de données initialisée
- [ ] Admin créé avec succès
- [ ] API fonctionnelle `/api/posts`
- [ ] Authentification JWT testée
- [ ] Frontend Next.js opérationnel

## 🧪 Tests de validation
```bash
# Health check
curl https://votredomaine.com/health

# API Posts
curl https://votredomaine.com/api/posts

# Login admin
curl -X POST https://votredomaine.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@votredomaine.com","password":"VotreNouveauMotDePasse"}'
```

## 📊 Monitoring
- [ ] Logs Dokploy sans erreurs
- [ ] Métriques CPU/RAM normales
- [ ] SSL Certificate valide
- [ ] Backup base de données configuré