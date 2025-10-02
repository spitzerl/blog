# 🧹 NETTOYAGE DOKPLOY - Commandes pour l'équipe

## Si le déploiement échoue avec "port already allocated"

### 1. Dans l'interface Dokploy :
- Allez dans votre application
- Cliquez sur "Stop" puis "Remove"
- Attendez que tout soit nettoyé
- Relancez le déploiement

### 2. Si le problème persiste, SSH sur votre serveur :

```bash
# Arrêter tous les containers Docker
sudo docker stop $(sudo docker ps -aq)

# Supprimer tous les containers
sudo docker rm $(sudo docker ps -aq)

# Nettoyer les réseaux orphelins
sudo docker network prune -f

# Nettoyer les volumes orphelins (ATTENTION: supprime les données)
sudo docker volume prune -f

# Vérifier qu'aucun port n'est utilisé
sudo netstat -tlnp | grep :3000
```

### 3. Dans Dokploy après nettoyage :
- Redéployer l'application
- Vérifier les logs de build
- Tester l'accès à l'application

## 🎯 Configuration recommandée Dokploy

### Dans l'onglet "Settings" de votre app :
- **Port**: 3000 (port interne)
- **Health Check Path**: /health
- **Environment**: production

### Dans l'onglet "Domains" :
- Domaine principal configuré
- HTTPS activé (Let's Encrypt)
- Port automatique (géré par Dokploy)