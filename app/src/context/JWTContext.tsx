import React, {createContext, useState, useEffect} from 'react';
import useChildrenSpawner from '../hooks/useChildrenSpawner';
import JWTContextType from '../@types/authenticate';

const JWTContext = createContext<JWTContextType | null>(null)

interface Props {
    children: React.ReactNode;
};

export default function JWTProvider ({ children }: Props) {
    const spawns = useChildrenSpawner(children);



    /**
     * Here's the Provider
     */
    const providerValue = {
        isAuthenticated: false
    }
    return (
        <JWTContext.Provider value={providerValue}>
            {spawns}
        </JWTContext.Provider>
    );
}