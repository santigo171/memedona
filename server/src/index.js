// import { run, stop, resetCollectors } from "./app.js";
import { run, resetCollectors } from "./app.js";

// const restartDelay = parseInt(process.env.RESTART_DELAY_SEC) * 1000;

function reset() {
  resetCollectors();
}

run(0);

process.on("uncaughtException", async (err) => {
  console.log("\nUNCAUGHT EXCEPTION");
  if (err.message == "db not running") {
    console.log("Db not running");
    process.exit();
  } else if (
    err.message == "Cannot read properties of undefined (reading 'cache')"
  ) {
    console.log("Undefined cache ;(");
    reset();
  } else if (err.code == "ER_DUP_ENTRY") {
    console.log(err);
    console.log("Duplicate entry ;(");
    reset();
  } else {
    console.log(err);
    console.log(err.code);

    process.exit();
  }
});
