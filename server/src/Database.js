import mysql from "mysql2";

class Database {
  #connection;

  #connect() {
    return new Promise((resolve, reject) => {
      this.#connection.connect((err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  query(sql) {
    return new Promise((resolve, reject) => {
      this.#connection.query(sql, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  setUp(settings) {
    return new Promise(async (resolve, reject) => {
      try {
        const { host, user, password, database } = settings;
        this.#connection = mysql.createConnection({
          host: host,
          user: user,
          password: password,
          database: database,
        });
        await this.#connect();
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  fetchSources(collector_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.query(`
        SELECT id, name, url_start
        FROM sources
        ${collector_id ? "WHERE collector_id = 1" : ""}`);
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }

  async insertMemes(memesToBeInserted) {
    let memes;
    if (!Array.isArray(memesToBeInserted)) {
      memes = [memesToBeInserted];
    } else {
      memes = memesToBeInserted;
    }

    const sqlFormatedMemes = memes.map((meme) => {
      if (!meme.url)
        throw new Error(`${meme.url} is not a valid url for a meme`);
      if (!meme.type)
        throw new Error(`${meme.type} is not a valid type for a meme`);
      if (!meme.sourceId)
        throw new Error(`${meme.sourceId} is not a valid sourceId for a meme`);

      return `('${meme.type}', '${meme.url}', ${meme.sourceId})`;
    });

    const memesSql = `
    insert into memes (type, url, source_id)
    values
    ${sqlFormatedMemes.join(",\n    ")}
    `;

    const insertedMemes = await this.query(memesSql);
    console.log(insertedMemes);
  }
}

const db = new Database();
Object.freeze(db);

export { db };
