import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { AppContextProvider } from '../src/Config/Context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </AppContextProvider>
  );
}

export default MyApp
