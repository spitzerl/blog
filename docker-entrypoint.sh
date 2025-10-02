#!/bin/sh

# docker-entrypoint.sh - Script de démarrage pour le conteneur

set -e

echo "🚀 Démarrage du blog..."

# Attendre que PostgreSQL soit prêt
echo "⏳ Attente de la base de données..."
while ! nc -z ${DB_HOST:-postgres} ${DB_PORT:-5432}; do
  sleep 1
done
echo "✅ Base de données prête"

# Appliquer les migrations Prisma
echo "📝 Application des migrations..."
npx prisma migrate deploy

# Générer le client Prisma (au cas où)
echo "🔄 Génération du client Prisma..."
npx prisma generate

# Seeder si nécessaire (seulement si la variable SEED_DB=true)
if [ "$SEED_DB" = "true" ]; then
  echo "🌱 Seeding de la base de données..."
  npm run seed || echo "⚠️ Erreur lors du seeding (peut-être déjà fait)"
fi

# Démarrer les services
echo "🎯 Démarrage des services..."

# Démarrer le backend en arrière-plan
if [ -f "backend/index.js" ]; then
  echo "🔧 Démarrage du backend sur le port 3001..."
  node backend/index.js &
  BACKEND_PID=$!
fi

# Démarrer Next.js
echo "⚡ Démarrage de Next.js sur le port 3000..."
if [ "$NODE_ENV" = "production" ]; then
  exec node server.js
else
  exec npm run dev
fi