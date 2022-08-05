import { run, stop } from "./app.js";

function reset() {
  stop();
  run();
}

run();

process.on("uncaughtException", async (err) => {
  console.log("\nUNCAUGHT EXCEPTION");
  if (err.message == "db not running") {
    console.error("Db not running");
    process.exit();
  } else if (
    err.message == "Cannot read properties of undefined (reading 'cache')"
  ) {
    console.log("Undefined cache ;(");
    reset();
  } else if (err.code == "ER_DUP_ENTRY") {
    console.log("Duplicate entry ;(");
    reset();
  } else {
    console.log(err);
    console.log(err.code);

    process.exit();
  }
});
