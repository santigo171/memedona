import mysql from "mysql2";

class Database {
  #connection;
  #database;

  #connect() {
    return new Promise((resolve, reject) => {
      this.#connection.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.release();
          resolve();
        }
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
        this.#connection = mysql.createPool({
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
    const currentDatabase = res.filter((db) => db.name === this.#database)[0];
    console.log(
      `Current Database (${currentDatabase.name}) Size: ${currentDatabase.size}MB`
    );
  }
}

const db = new Database();
Object.freeze(db);

export { db };
