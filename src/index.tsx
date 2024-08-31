import React from "react";
import reactDOM from "react-dom/client";
import App from "./App";

const reactRoot = document.querySelector("div#root");

reactDOM.createRoot(reactRoot as HTMLElement).render(<App />);
