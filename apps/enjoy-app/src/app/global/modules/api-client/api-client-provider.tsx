import React, {useState} from 'react';
import {useToast} from '../toast/use-toast';
import {ApiClientContext} from './api-client-context';
import {ApiClient} from "./";

type Props = {
  client?: ApiClient;
  children: React.ReactNode;
};

export const ApiClientProvider = (props: Props) => {
  const {setToast} = useToast();
  const [client] = useState(props.client || new ApiClient(setToast));

  return <ApiClientContext.Provider value={client}>{props.children}</ApiClientContext.Provider>;
};
