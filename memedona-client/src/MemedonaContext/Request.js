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
  static patch(url, body) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const result = await response.json();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export { Request };
