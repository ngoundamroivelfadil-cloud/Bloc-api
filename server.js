const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const articlesRouter = require('./routes/articles');
app.use('/api/articles', articlesRouter);

app.get('/', (req, res) => {
  res.json({
    message: 'API Blog INF222 - Active !',
    endpoints: {
      articles: '/api/articles'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ erreur: 'Route introuvable' });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
