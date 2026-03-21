const Database = require('better-sqlite3');

const db = new Database('blog.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    titre     TEXT    NOT NULL,
    contenu   TEXT    NOT NULL,
    auteur    TEXT    NOT NULL,
    date      TEXT    NOT NULL,
    categorie TEXT    NOT NULL DEFAULT 'General',
    tags      TEXT    NOT NULL DEFAULT '[]'
  )
`);

console.log('Base de données prête !');

module.exports = db;
