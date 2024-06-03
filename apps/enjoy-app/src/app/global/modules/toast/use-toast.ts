import React from 'react';
import { ToastContext, ToastContextData } from './toast-context';

export function useToast() {
  const ctx = React.useContext<ToastContextData>(ToastContext);

  if (!ctx) {
    throw new Error('toast not started');
  }

  return ctx;
}
