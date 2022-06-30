class Request {
  static get(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url, { method: "GET" });
        const result = await response.json();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
  static patch() {}
}

export { Request };
