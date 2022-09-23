// import 'primereact/resources/themes/fluent-light/theme.css';
// import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
// import 'primereact/resources/themes/tailwind-light/theme.css';
// import '../assets/layout/layout.scss';
// import 'primereact/resources/themes/md-light-indigo/theme.css';

// import '@syncfusion/ej2-base/styles/material.css';
// import '@syncfusion/ej2-buttons/styles/material.css';
// import '@syncfusion/ej2-calendars/styles/material.css';
// import '@syncfusion/ej2-dropdowns/styles/material.css';
// import '@syncfusion/ej2-inputs/styles/material.css';
// import '@syncfusion/ej2-navigations/styles/material.css';
// import '@syncfusion/ej2-popups/styles/material.css';
// import '@syncfusion/ej2-splitbuttons/styles/material.css';
// import "@syncfusion/ej2-react-grids/styles/material.css";

// pivot css
import '@syncfusion/ej2-base/styles/bootstrap.css';
import '@syncfusion/ej2-buttons/styles/bootstrap.css';
import '@syncfusion/ej2-dropdowns/styles/bootstrap.css';
import '@syncfusion/ej2-grids/styles/bootstrap.css';
import '@syncfusion/ej2-inputs/styles/bootstrap.css';
import '@syncfusion/ej2-lists/styles/bootstrap.css';
import '@syncfusion/ej2-navigations/styles/bootstrap.css';
import '@syncfusion/ej2-popups/styles/bootstrap.css';
import "@syncfusion/ej2-splitbuttons/styles/bootstrap.css";
import '@syncfusion/ej2-calendars/styles/bootstrap.css';
import '@syncfusion/ej2-react-pivotview/styles/bootstrap.css';
// gantt css
import '@syncfusion/ej2-calendars/styles/bootstrap.css';
import '@syncfusion/ej2-gantt/styles/bootstrap.css';
import '@syncfusion/ej2-layouts/styles/bootstrap.css';
import '@syncfusion/ej2-navigations/styles/bootstrap.css';
import '@syncfusion/ej2-richtexteditor/styles/bootstrap.css';
import '@syncfusion/ej2-treegrid/styles/bootstrap.css';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/globals.css';

import { RootLayout } from '../components/layout/layout';
import { Toast } from 'primereact/toast';

import React, { useState, useEffect, useRef } from 'react'
import NextNProgress from "nextjs-progressbar";


// font awesome
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { registerLicense } from '@syncfusion/ej2-base';
import { locale, addLocale } from 'primereact/api';

import { L10n, setCulture } from '@syncfusion/ej2-base';
import { primereactLocale, syncfusionLocale } from '../utils/locales';

registerLicense(process.env.NEXT_PUBLIC_SYNCFUSION_LICENSE);
L10n.load(syncfusionLocale);
// setCulture('fr');

config.autoAddCss = false

addLocale('fr', primereactLocale);
locale('fr')

const pagesNoLayout = ['/auth/login']

function MyApp({ Component, pageProps, ...appProps }) {
	const toast = useRef(null);
	const layoutNotNeeded = pagesNoLayout.includes(appProps.router.pathname);
	const LayoutComponent = layoutNotNeeded ? React.Fragment : RootLayout;


	return (

		<LayoutComponent>
			<NextNProgress color="#29D" height={6} />
			<Toast ref={toast} />
			{/* < SWRConfig value={{
				onError: (error, key) => {
					// if (error.status !== 403 && error.status !== 404) {
					// We can send the error to Sentry,
					// or show a notification UI.
					toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Message Content', life: 3000 });

					// }
				}
			}}> */}

			<Component toast={toast} {...pageProps} />
			{/* </SWRConfig > */}
		</LayoutComponent >
	)
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp