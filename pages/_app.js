// pages/_app.js

import "primereact/resources/themes/saga-blue/theme.css"; // veya kullandığınız temaya uygun olanı seçin
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
