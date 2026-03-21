const Article = require('../models/Article');

const articleController = {

  getAll: (req, res) => {
    try {
      const { categorie, auteur, date } = req.query;
      const articles = Article.getAll({ categorie, auteur, date });
      res.status(200).json(articles);
    } catch (err) {
      res.status(500).json({ erreur: 'Erreur serveur', details: err.message });
    }
  },

  search: (req, res) => {
    try {
      const { query } = req.query;
      if (!query || query.trim() === '') {
        return res.status(400).json({ erreur: 'Le paramètre "query" est obligatoire' });
      }
      const results = Article.search(query);
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ erreur: 'Erreur serveur', details: err.message });
    }
  },

  getById: (req, res) => {
    try {
      const article = Article.getById(req.params.id);
      if (!article) {
        return res.status(404).json({ erreur: `Article introuvable` });
      }
      res.status(200).json(article);
    } catch (err) {
      res.status(500).json({ erreur: 'Erreur serveur', details: err.message });
    }
  },

  create: (req, res) => {
    try {
      const { titre, contenu, auteur, date, categorie, tags } = req.body;

      if (!titre || titre.trim() === '') {
        return res.status(400).json({ erreur: 'Le champ "titre" est obligatoire' });
      }
      if (!contenu || contenu.trim() === '') {
        return res.status(400).json({ erreur: 'Le champ "contenu" est obligatoire' });
      }
      if (!auteur || auteur.trim() === '') {
        return res.status(400).json({ erreur: 'Le champ "auteur" est obligatoire' });
      }

      const newArticle = Article.create({ titre, contenu, auteur, date, categorie, tags });
      res.status(201).json({
        message: 'Article créé avec succès',
        article: newArticle
      });
    } catch (err) {
      res.status(500).json({ erreur: 'Erreur serveur', details: err.message });
    }
  },

  update: (req, res) => {
    try {
      const updated = Article.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ erreur: `Article introuvable` });
      }
      res.status(200).json({
        message: 'Article mis à jour avec succès',
        article: updated
      });
    } catch (err) {
      res.status(500).json({ erreur: 'Erreur serveur', details: err.message });
    }
  },

  delete: (req, res) => {
    try {
      const deleted = Article.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ erreur: `Article introuvable` });
      }
      res.status(200).json({
        message: `Article supprimé avec succès`
      });
    } catch (err) {
      res.status(500).json({ erreur: 'Erreur serveur', details: err.message });
    }
  },
};

module.exports = articleController;
