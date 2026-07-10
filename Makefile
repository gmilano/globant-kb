.PHONY: ingest hooks ideas reddit news rss status

ingest: ## Correr todos los scripts de ingest
	@bash ingest/ingest-all.sh

hooks: ## Correr hooks de ontología/grafo/agentes
	@bash .kb-hooks/run-hooks.sh daily

ideas: ## Generar ideas del día
	@bash ingest/ideas-generator.sh

reddit: ## Solo ingest Reddit
	@bash ingest/reddit.sh

news: ## Solo tech news
	@bash ingest/tech-news.sh

rss: ## Solo RSS feeds
	@bash ingest/rss.sh

status: ## Estado de la KB
	@echo "📚 globant-kb (Globant Intelligence)"
	@echo "Wiki articles: $$(find wiki -name '*.md' 2>/dev/null | wc -l | tr -d ' ')"
	@echo "Raw files:     $$(find raw -name '*.md' 2>/dev/null | wc -l | tr -d ' ')"
	@echo "Ideas:         $$(ls viz/ideas/*.md 2>/dev/null | wc -l | tr -d ' ') días"
	@echo "Last commit:   $$(git log -1 --format='%ar — %s' 2>/dev/null)"
