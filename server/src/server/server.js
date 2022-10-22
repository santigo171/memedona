import express from "express";
import * as cors from "cors";

// routers
import { router as brandRouter } from "./routes/brands.js";
import { router as assetsRouter } from "./routes/assets.js";
import { router as collectorRouter } from "./routes/collectors.js";
import { router as memesRouter } from "./routes/memes.js";
import { router as sourcesRouter } from "./routes/sources.js";
import { router as topicsRouter } from "./routes/topics.js";

function fullUrlMiddleware(req, res, next) {
  let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
  if (fullUrl.slice(-1) === "/") {
    req.fullUrl = fullUrl.slice(0, -1);
  } else {
    req.fullUrl = fullUrl;
  }
  next();
}

function passwordMiddleware(req, res, next, validPassword) {
  const enteredPassword = String(req.headers["password"]);

  if (String(validPassword) !== String(enteredPassword)) {
    return res.status(401).send({ message: "Unauthorized" });
  } else {
    next();
  }
}
function adminPasswordMiddleware(req, res, next) {
  passwordMiddleware(req, res, next, process.env.ADMIN_PASSWORD);
}
function collectorsPasswordMiddleware(req, res, next) {
  passwordMiddleware(req, res, next, process.env.COLLECTORS_PASSWORD);
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
  #port;
  #corsWhitelist;
  #app;
  #runningApp;

  #v1Router;

  setUp(settings) {
    const { port, corsWhitelist } = settings;
    this.#port = port;
    this.#corsWhitelist = corsWhitelist;
    this.#app = express();
    this.#setV1Router();
  }

  run() {
    return new Promise((resolve) => {
      const app = this.#app;
      app.use(express.json());

      app.use(
        cors.default({
          origin: (origin, callback) => {
            if (this.#corsWhitelist.indexOf(origin) !== -1) {
              callback(null, true);
            } else {
              callback(null, false);
            }
          },
        })
      );

      app.use((req, res, next) => {
        res.set("Access-Control-Allow-Origin", "*");
        next();
      });

      app.get("/", fullUrlMiddleware, (req, res) => {
        res.status(200).send({
          entrypoints: {
            v1: `${req.fullUrl}/v1`,
            assets: `${req.fullUrl}/assets`,
          },
        });
      });
      app.use("/assets", assetsRouter);

      app.use("/v1", this.#v1Router);

      this.#runningApp = app.listen(this.#port, () => resolve(this.#port));
    });
  }

  stop() {
    this.#runningApp.close();
  }

  #setV1Router() {
    this.#v1Router = express.Router();
    const v1Router = this.#v1Router;

    v1Router.get("/", fullUrlMiddleware, (req, res) => {
      res.status(200).send({
        entrypoints: {
          brands: `${req.fullUrl}/brands`,
          collectors: `${req.fullUrl}/collectors`,
          memes: `${req.fullUrl}/memes`,
          sources: `${req.fullUrl}/sources`,
          topics: `${req.fullUrl}/topics`,
        },
      });
    });

    v1Router.use("/brands", brandRouter);
    v1Router.use("/collectors", collectorRouter);
    v1Router.use("/memes", memesRouter);
    v1Router.use("/sources", sourcesRouter);
    v1Router.use("/topics", topicsRouter);
  }
}

const server = new Server();

export {
  server,
  fullUrlMiddleware,
  adminPasswordMiddleware,
  collectorsPasswordMiddleware,
  updateQueryStringParameter,
};
