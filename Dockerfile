# Dockerfile multi-stage pour le blog Next.js + Express

# ===== BASE STAGE =====
FROM node:20-alpine AS base

# Installation des dépendances pour Prisma
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY prisma ./prisma/

# ===== DEPENDENCIES STAGE =====
FROM base AS deps

# Installation des dépendances
RUN npm ci --only=production && npm cache clean --force

# ===== DEVELOPMENT DEPENDENCIES STAGE =====
FROM base AS dev-deps

# Installation de toutes les dépendances (dev incluses)
RUN npm ci

# ===== BUILD STAGE =====
FROM dev-deps AS build

# Copier le code source
COPY . .

# Variables d'environnement pour le build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Générer le client Prisma
RUN npx prisma generate

# Build de l'application Next.js
RUN npm run build

# ===== PRODUCTION STAGE =====
FROM base AS production

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires depuis le build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/backend ./backend

# Copier le fichier package.json pour les scripts
COPY package*.json ./

# Ajuster les permissions
RUN chown -R nextjs:nodejs /app
USER nextjs

# Exposer les ports
EXPOSE 3000 3001

# Variables d'environnement
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# Script de démarrage
COPY --chown=nextjs:nodejs docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Point d'entrée
ENTRYPOINT ["/app/docker-entrypoint.sh"]

# ===== DEVELOPMENT STAGE =====
FROM dev-deps AS development

# Exposer les ports pour le développement
EXPOSE 3000 3001 5555

# Variables d'environnement pour le développement
ENV NODE_ENV=development

# Commande par défaut pour le développement
CMD ["npm", "run", "dev"]