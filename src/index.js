import "./index.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from "./serviceWorker";
import { AppProviders } from "./Providers/AppProviders";
import AppTheme from './Providers/AppTheme';
import App from "./Entry";
import '@fontsource/poppins'

// import PoweredByLogin from "./components/DummyLogger";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Suspense fallback={<div></div>}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        {/* <PoweredByLogin /> */}
        <AppProviders>
          <AppTheme>
            <App />
          </AppTheme>
        </AppProviders>
      </BrowserRouter>
    </Suspense>
  </>
);

serviceWorkerRegistration.register();
