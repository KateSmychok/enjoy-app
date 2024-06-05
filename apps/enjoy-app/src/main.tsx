import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import GlobalStyles from './app/global/global-styles';
import { defaultTheme } from '@global/theme';
import { ToastProvider } from '@global/modules/toast/toast-provider';
import { ApiClientProvider } from '@global/modules/api-client';
import App from './app/app';
import { Provider } from 'react-redux';
import { store } from '@store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Provider store={store}>
        <BrowserRouter>
          <ApiClientProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </ApiClientProvider>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
