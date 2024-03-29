import { Request } from "./Request";

class ApiConsumer {
  #apiUrl;

  async startCollector(collectorUrl) {
    try {
      await Request.get(collectorUrl);
    } catch (err) {
      console.log("Couldn't activate collector");
    }
  }

  setApiUrl(apiUrl) {
    this.#apiUrl = apiUrl;
  }

  getCurrentBrand() {
    const url = `${this.#apiUrl}/v1/brands/current`;
    return Request.get(url);
  }

  getCollectors() {
    const url = `${this.#apiUrl}/v1/collectors`;
    return Request.get(url);
  }

  getTopics() {
    const url = `${this.#apiUrl}/v1/topics`;
    return Request.get(url);
  }

  getMemes(params) {
    const url = new URL(`${this.#apiUrl}/v1/memes`);
    for (let param in params) {
      url.searchParams.set(param, params[param]);
    }
    return Request.get(url);
  }

  getAssetUrl(url) {
    return `${this.#apiUrl}/assets/${url}`;
  }

  patchMeme({ id, likes, shares }) {
    const url = `${this.#apiUrl}/v1/memes/${id}`;
    const body = { likes, shares };
    return Request.patch(url, body);
  }
}

const apiConsumer = new ApiConsumer();

export { apiConsumer };
