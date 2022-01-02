import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import LinearProgressWithLabel from '../../LinearProgressWithLabel';

interface Props {
  current: number;
  total: number;
};

export default function ProgressBar(props: Props) {
  const {total, current} = props;
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
      setProgress(Math.round((current/total) * 100));
    }, [current, total]);
  
    return <LinearProgressWithLabel value={progress} label={`${current}/${total}`}/>
}

