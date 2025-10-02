# 🛡️ SÉCURITÉ PRODUCTION - VARIABLES À CHANGER ABSOLUMENT

## ⚠️ AVANT LE DÉPLOIEMENT, CHANGEZ CES VALEURS :

### 1. JWT_SECRET
**Valeur actuelle** : `dev-secret-key-change-in-production`
**Nouvelle valeur** : Générez un secret de 256 bits minimum
```bash
# Générer un secret sécurisé :
openssl rand -base64 64
```

### 2. POSTGRES_PASSWORD
**Valeur actuelle** : `blogpassword`  
**Nouvelle valeur** : Mot de passe complexe (16+ caractères)

### 3. ADMIN_PASSWORD
**Valeur actuelle** : `changeme`
**Nouvelle valeur** : Mot de passe fort pour l'admin

### 4. JWT_REFRESH_SECRET
**Nouvelle valeur** : DIFFÉRENT du JWT_SECRET principal
```bash
openssl rand -base64 64
```

## 🔐 Exemple de variables sécurisées :

```env
POSTGRES_PASSWORD=Kj8$mN2#pQ9!vX7*wE4@rT6&yU1^iO0+
JWT_SECRET=YXNkZmphc2tkZmpoa2FzZGZqaGtqYXNkZmtqaGFrc2RmaGtqYXNkZmtqaGFzZGZramhhc2Rma2poYWtm
JWT_REFRESH_SECRET=ZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGZnZGY=
ADMIN_PASSWORD=SuperMotDePasseAdmin2024!@#
```

## 🚨 NE JAMAIS COMMITER CES VALEURS DANS GIT !