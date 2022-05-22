import express from "express";

// routers
import { router as brandRouter } from "./routes/brands.js";
import { router as collectorRouter } from "./routes/collectors.js";
import { router as memesRouter } from "./routes/memes.js";
import { router as topicRouter } from "./routes/topics.js";

function fullUrlMiddleware(req, res, next) {
  req.fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  req.noParamsUrl =
    req.protocol + "://" + req.get("host") + req.originalUrl.split("?").shift();
  next();
}

function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf("?") !== -1 ? "&" : "?";
  if (uri.match(re)) {
    return uri.replace(re, "$1" + key + "=" + value + "$2");
  } else {
    return uri + separator + key + "=" + value;
  }
}

class Server {
  #app;
  #port;

  #v1Router;

  setUp(settings) {
    const { port } = settings;
    this.#port = port;
    this.#app = express();
    this.#setV1Router();
  }

  run() {
    return new Promise((resolve) => {
      const app = this.#app;

      app.use(express.json());

      app.get("/", fullUrlMiddleware, (req, res) => {
        res.status(400).send({
          message: `Error: No version specified, try ${req.fullUrl}v1`,
        });
      });

      app.use("/v1", this.#v1Router);

      app.listen(this.#port, () => resolve(this.#port));
    });
  }

  #setV1Router() {
    this.#v1Router = express.Router();
    const v1Router = this.#v1Router;

    v1Router.get("/", fullUrlMiddleware, (req, res) => {
      const { fullUrl } = req;

      res.status(200).send({
        brands: `${fullUrl}brands`,
        collectors: `${fullUrl}collectors`,
        memes: `${fullUrl}memes`,
        topics: `${fullUrl}topics`,
      });
    });

    v1Router.use("/brands", brandRouter);
    v1Router.use("/collectors", collectorRouter);
    v1Router.use("/memes", memesRouter);
    v1Router.use("/topics", topicRouter);
  }
}

const server = new Server();

export { server, fullUrlMiddleware, updateQueryStringParameter };
