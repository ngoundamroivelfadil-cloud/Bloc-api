# Blog API - INF222 EC1 TAF1

API Backend pour la gestion d'un blog simple avec Node.js, Express et SQLite.

## Technologies utilisées

- Node.js 18 + Express
- SQLite (better-sqlite3)

## Installation
```bash
git clone https://github.com/ngoundamroivelfadil-cloud/Bloc-api.git
cd blog-api
npm install
node server.js
```

## Endpoints

| Méthode | URL | Description |
|---------|-----|-------------|
| GET | /api/articles | Liste tous les articles |
| GET | /api/articles/:id | Récupère un article |
| POST | /api/articles | Crée un article |
| PUT | /api/articles/:id | Modifie un article |
| DELETE | /api/articles/:id | Supprime un article |
| GET | /api/articles/search?query=texte | Recherche |

## Exemple
```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{"titre": "Mon article", "contenu": "Contenu", "auteur": "MOUNBEKET NGOUNDAM"}'
```

## Auteur

MOUNBEKET NGOUNDAM V ABDEL FADIL - 24G2782
