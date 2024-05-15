import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {ThemeProvider} from '@emotion/react';
import GlobalStyles from './app/global/global-styles';
import {defaultTheme} from './app/global/theme';
import {ToastProvider} from './app/global/modules/toast/toast-provider';
import {ApiClientProvider} from './app/global/modules/api-client';
import App from './app/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles/>
      <BrowserRouter>
        <ApiClientProvider>
          <ToastProvider>
            <App/>
          </ToastProvider>
        </ApiClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
