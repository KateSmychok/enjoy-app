import React from 'react';
import { ToastType } from '../../utils/enum';

export interface ToastContextData {
  setToast: (msg: string, type: ToastType) => void;
}

export const ToastContext = React.createContext<ToastContextData>({
  setToast: () => null,
});
