# Makefile pour simplifier les commandes Docker

.PHONY: help build dev prod stop clean logs shell db-shell prisma-studio

# Variables
COMPOSE_FILE=docker-compose.yml
COMPOSE_PROD_FILE=docker-compose.prod.yml
IMAGE_NAME=blog-app

# Aide
help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ===== DÉVELOPPEMENT =====
dev: ## Démarre l'environnement de développement
	docker-compose -f $(COMPOSE_FILE) up --build

dev-d: ## Démarre l'environnement de développement en arrière-plan
	docker-compose -f $(COMPOSE_FILE) up --build -d

# ===== PRODUCTION =====
prod: ## Démarre l'environnement de production (local)
	docker compose -f $(COMPOSE_PROD_FILE) up --build -d

prod-dokploy: ## Test en local avec la config Dokploy
	@echo "🚀 Test de la configuration Dokploy en local..."
	docker compose -f $(COMPOSE_PROD_FILE) up --build -d
	@echo "✅ Environnement Dokploy prêt sur http://localhost:3000"

# ===== BUILD =====
build: ## Construit l'image Docker
	docker build -t $(IMAGE_NAME) .

build-prod: ## Construit l'image Docker pour la production
	docker build -t $(IMAGE_NAME):production --target production .

# ===== CONTRÔLE =====
stop: ## Arrête tous les conteneurs
	docker-compose -f $(COMPOSE_FILE) down
	docker-compose -f $(COMPOSE_PROD_FILE) down

restart: ## Redémarre l'environnement de développement
	make stop
	make dev-d

# ===== NETTOYAGE =====
clean: ## Nettoie les conteneurs et volumes
	docker-compose -f $(COMPOSE_FILE) down -v --rmi all
	docker-compose -f $(COMPOSE_PROD_FILE) down -v --rmi all

prune: ## Nettoie Docker complètement
	docker system prune -af
	docker volume prune -f

# ===== LOGS =====
logs: ## Affiche les logs des conteneurs
	docker-compose -f $(COMPOSE_FILE) logs -f

logs-web: ## Affiche les logs du conteneur web
	docker-compose -f $(COMPOSE_FILE) logs -f web

logs-db: ## Affiche les logs de PostgreSQL
	docker-compose -f $(COMPOSE_FILE) logs -f postgres

# ===== ACCÈS =====
shell: ## Accès shell au conteneur web
	docker-compose -f $(COMPOSE_FILE) exec web sh

db-shell: ## Accès shell PostgreSQL
	docker-compose -f $(COMPOSE_FILE) exec postgres psql -U bloguser -d blogdb

# ===== OUTILS =====
prisma-studio: ## Lance Prisma Studio
	docker-compose -f $(COMPOSE_FILE) --profile tools up prisma-studio

migrate: ## Applique les migrations Prisma
	docker-compose -f $(COMPOSE_FILE) exec web npx prisma migrate deploy

seed: ## Lance le seeding de la base
	docker-compose -f $(COMPOSE_FILE) exec web npm run seed

# ===== STATUS =====
status: ## Affiche le statut des conteneurs
	docker-compose -f $(COMPOSE_FILE) ps

# ===== EXEMPLE D'UTILISATION =====
demo: ## Démarre un environnement de démonstration complet
	@echo "🚀 Démarrage de l'environnement de démonstration..."
	make dev-d
	@echo "⏳ Attente du démarrage complet..."
	sleep 30
	@echo "✅ Démonstration prête !"
	@echo "📱 Frontend: http://localhost:3002"
	@echo "🔧 Backend API: http://localhost:3003"
	@echo "🗃️  Prisma Studio: make prisma-studio (puis http://localhost:5556)"