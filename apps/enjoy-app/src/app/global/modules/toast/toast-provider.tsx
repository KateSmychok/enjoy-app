import React, { useRef, useState } from 'react';
import { ToastType } from '../../utils/enum';
import Toast from '../../components/toast/toast';
import { ToastContext } from './toast-context';

type Props = {
  children: React.ReactNode;
};

export const ToastProvider = (props: Props) => {
  const [toastMsg, setToastMsg] = useState<string>('');
  const [toastType, setToastType] = useState<ToastType>(ToastType.Failed);
  const toastTimerMs = toastType === ToastType.Failed ? 8000 : 4000;

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const setToast = (msg: string, type: ToastType) => {
    setToastType(type);
    setToastMsg(msg);

    clearTimeout(timerRef.current as NodeJS.Timeout);

    const timer: NodeJS.Timeout = setTimeout(() => {
      setToastMsg('');
      setToastType(ToastType.Failed);
    }, toastTimerMs);
    timerRef.current = timer;
  };

  const onClose = () => {
    clearTimeout(timerRef.current as NodeJS.Timeout);
    setToastMsg('');
    setToastType(ToastType.Failed);
  };

  return (
    <ToastContext.Provider value={{ setToast }}>
      {props.children}
      {!!toastMsg && (
        <Toast
          open={!!toastMsg}
          text={toastMsg}
          onClose={onClose}
          type={toastType}
        />
      )}
    </ToastContext.Provider>
  );
};
