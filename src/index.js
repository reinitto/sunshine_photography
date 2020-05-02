import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
require("./styles/style.css");
require("bootstrap");
const App = lazy(() => {
  return import("./App");
});

ReactDOM.render(
  <Suspense fallback={<div>Loading</div>}>
    <App />
  </Suspense>,

  document.getElementById("root")
);
