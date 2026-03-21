const db = require('../database');

const Article = {

  getAll: (filters = {}) => {
    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];

    if (filters.categorie) {
      query += ' AND categorie = ?';
      params.push(filters.categorie);
    }
    if (filters.auteur) {
      query += ' AND auteur LIKE ?';
      params.push(`%${filters.auteur}%`);
    }
    if (filters.date) {
      query += ' AND date LIKE ?';
      params.push(`${filters.date}%`);
    }

    query += ' ORDER BY id DESC';
    const rows = db.prepare(query).all(...params);
    return rows.map(r => ({ ...r, tags: JSON.parse(r.tags) }));
  },

  getById: (id) => {
    const row = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
    if (!row) return null;
    return { ...row, tags: JSON.parse(row.tags) };
  },

  create: (data) => {
    const stmt = db.prepare(`
      INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const now = data.date || new Date().toISOString();
    const tags = JSON.stringify(data.tags || []);
    const result = stmt.run(data.titre, data.contenu, data.auteur, now, data.categorie || 'General', tags);
    return Article.getById(result.lastInsertRowid);
  },

  update: (id, data) => {
    const existing = Article.getById(id);
    if (!existing) return null;

    const updated = {
      titre:     data.titre     || existing.titre,
      contenu:   data.contenu   || existing.contenu,
      auteur:    data.auteur    || existing.auteur,
      categorie: data.categorie || existing.categorie,
      tags:      JSON.stringify(data.tags || existing.tags),
    };

    db.prepare(`
      UPDATE articles SET titre=?, contenu=?, auteur=?, categorie=?, tags=?
      WHERE id=?
    `).run(updated.titre, updated.contenu, updated.auteur, updated.categorie, updated.tags, id);

    return Article.getById(id);
  },

  delete: (id) => {
    const existing = Article.getById(id);
    if (!existing) return null;
    db.prepare('DELETE FROM articles WHERE id = ?').run(id);
    return existing;
  },

  search: (query) => {
    const rows = db.prepare(`
      SELECT * FROM articles
      WHERE titre LIKE ? OR contenu LIKE ?
      ORDER BY id DESC
    `).all(`%${query}%`, `%${query}%`);
    return rows.map(r => ({ ...r, tags: JSON.parse(r.tags) }));
  },
};

module.exports = Article;
