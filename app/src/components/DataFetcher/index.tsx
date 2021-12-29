import React, { useState, useEffect, useCallback } from 'react';
import { localHttp, quizHttp } from '../../utils/axios';
import useSpawnChildren from '../../hooks/useChildrenSpawner';

interface Props{
    resourceUrl: string;
    resourceName: string;
    resourceParams: {};
    httpClient?: string;
    children: React.ReactNode;
}

export default function DataFetcher({
  resourceUrl, resourceName, resourceParams, children, httpClient
}: Props) {
  const [data, setData] = useState(null);
  const spawns = useSpawnChildren(children, { [resourceName]: data });
  const getResource = useCallback(() => {
    (async () => {
      let response;
      if (httpClient === 'quiz'){
        response = await quizHttp.get(resourceUrl, { params: resourceParams });
      } else {
        response = await localHttp.get(resourceUrl, { params: resourceParams });
      }
      setData(response.data);
    })();
  }, [httpClient, resourceUrl, resourceParams]);

  useEffect(() => {
    getResource();
  }, [resourceUrl, getResource]);

  return <>{spawns}</>;
}
