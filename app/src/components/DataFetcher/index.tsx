import React, { useState, useEffect, useCallback } from 'react';
import { localHttp, quizHttp } from '../../utils/axios';
import useSpawnChildren from '../../hooks/useChildrenSpawner';
import { AxiosInstance } from 'axios';

type HttpClientList = {
  [key: string]: AxiosInstance;
};

interface Props {
  resourceUrl: string;
  resourceName: string;
  resourceParams: unknown;
  httpClient?: string;
  children: React.ReactNode;
}

export default function DataFetcher({
  resourceUrl,
  resourceName,
  resourceParams,
  children,
  httpClient,
}: Props) {
  const [data, setData] = useState(null);
  const spawns = useSpawnChildren(children, { [resourceName]: data });
  const getResource = useCallback(() => {
    (async () => {
      const httpClients: HttpClientList = {
        quiz: quizHttp,
        local: localHttp,
      };
      const response = await httpClients[httpClient ?? 'local'].get(resourceUrl, {
        params: resourceParams,
      });
      setData(response.data);
    })();
  }, [httpClient, resourceUrl, resourceParams]);

  useEffect(() => {
    getResource();
  }, [resourceUrl, getResource]);

  return <>{spawns}</>;
}
