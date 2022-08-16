import mysql from "mysql2";

class Database {
  #connection;
  #database;

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
        this.#database = database;
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

  async verifySize() {
    const databaseSizeSql = `SELECT table_schema "name",
               ROUND(SUM(data_length + index_length) / 1024 / 1024, 1) "size"
               FROM information_schema.tables
               GROUP BY table_schema;`;

    const res = await this.query(databaseSizeSql);
    const currentDatabaseSize = res.filter(
      (db) => (db.name = this.#database)
    )[0].size;
    console.log(`Current Database Size: ${currentDatabaseSize}`);
  }
}

const db = new Database();
Object.freeze(db);

export { db };
