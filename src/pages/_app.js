// pivot css
import "@syncfusion/ej2-base/styles/bootstrap.css";
import "@syncfusion/ej2-buttons/styles/bootstrap.css";
import "@syncfusion/ej2-dropdowns/styles/bootstrap.css";
import "@syncfusion/ej2-grids/styles/bootstrap.css";
import "@syncfusion/ej2-inputs/styles/bootstrap.css";
import "@syncfusion/ej2-lists/styles/bootstrap.css";
import "@syncfusion/ej2-navigations/styles/bootstrap.css";
import "@syncfusion/ej2-popups/styles/bootstrap.css";
import "@syncfusion/ej2-splitbuttons/styles/bootstrap.css";
import "@syncfusion/ej2-calendars/styles/bootstrap.css";
import "@syncfusion/ej2-react-pivotview/styles/bootstrap.css";
// gantt css
import "@syncfusion/ej2-calendars/styles/bootstrap.css";
import "@syncfusion/ej2-gantt/styles/bootstrap.css";
import "@syncfusion/ej2-layouts/styles/bootstrap.css";
import "@syncfusion/ej2-navigations/styles/bootstrap.css";
import "@syncfusion/ej2-richtexteditor/styles/bootstrap.css";
import "@syncfusion/ej2-treegrid/styles/bootstrap.css";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "../styles/globals.css";

import { RootLayout } from "../components/layout/layout";
import { Toast } from "primereact/toast";

import React, { useRef } from "react";
import NextNProgress from "nextjs-progressbar";

// font awesome
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { registerLicense } from "@syncfusion/ej2-base";
import { locale, addLocale } from "primereact/api";

import { L10n } from "@syncfusion/ej2-base";
import { primereactLocale, syncfusionLocale } from "../utils/locales";

registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE);
L10n.load(syncfusionLocale);

config.autoAddCss = false;

addLocale("fr", primereactLocale);
locale("fr");

const pagesNoLayout = ["/auth/login"];

function MyApp({ Component, pageProps, ...appProps }) {
  const toast = useRef(null);
  const layoutNotNeeded = pagesNoLayout.includes(appProps.router.pathname);
  const LayoutComponent = layoutNotNeeded ? React.Fragment : RootLayout;

  return (
    <LayoutComponent>
      <NextNProgress color="#29D" height={6} />
      <Toast ref={toast} />
      <Component toast={toast} {...pageProps} />
    </LayoutComponent>
  );
}

export default MyApp;
