import React from 'react';
import {ApiClient} from '.';
import {ApiClientContext} from './api-client-context';

export function useApiClient() {
  const ctx = React.useContext<ApiClient>(ApiClientContext);

  if (!ctx) {
    throw new Error('api client not started');
  }

  return ctx;
}
