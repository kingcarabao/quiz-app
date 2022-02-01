import React from 'react';

// Hooks
import useChildrenSpawner from '../../hooks/useChildrenSpawner';

interface Props {
  children: React.ReactNode;
}

export default function Page({ children }: Props) {
  const spawns = useChildrenSpawner(children);

  return <>{spawns}</>;
}
