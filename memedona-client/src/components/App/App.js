import React from "react";
import { AppUi } from "./AppUi";
import { MemedonaProvider } from "../../MemedonaContext";

function App() {
  return (
    <MemedonaProvider>
      <AppUi />
    </MemedonaProvider>
  );
}

export { App };
