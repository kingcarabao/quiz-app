import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../utils/axios';
import useSpawnChildren from '../../hooks/useChildrenSpawner';

interface Props{
    resourceUrl: string;
    resourceName: string;
    resourceParams: {};
    children: React.ReactNode;
}

export default function ResourceLoader({ resourceUrl, resourceName, resourceParams, children }: Props){
    const [data, setData] = useState(null);
    const spawns = useSpawnChildren(children, { [resourceName]: data });

    const getResource = useCallback(() => {
        (async () => {
            const response = await axios.get(resourceUrl, {params: resourceParams});
            setData(response.data)
        }) ();
    }, [resourceUrl, resourceParams]);

    useEffect(() => {
        getResource();
    }, [resourceUrl, getResource]);

    return <>{spawns}</>;
}