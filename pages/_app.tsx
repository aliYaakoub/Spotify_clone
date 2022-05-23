import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { AppContextProvider } from '../src/Config/Context';
import Layout from '../src/Components/layouts/Layout';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  const CustomLayout = Component.CustomLayout || EmptyLayout;

  return (
    <AppContextProvider>
      <Layout>
        <CustomLayout>
          <Component {...pageProps} />
        </CustomLayout>
      </Layout>
    </AppContextProvider>
  );
}

export default MyApp

const EmptyLayout: React.FC = ({children}) => <>{children}</>