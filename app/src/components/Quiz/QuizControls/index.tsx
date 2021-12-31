import React from 'react';
import { Stack, Grid, Button } from '@mui/material';

interface Props {
  backIsDisabled: boolean;
  nextIsDisabled: boolean;
  navigate: Function
  sx?: any;
}

export default function Choice(props: Props) {
  const { backIsDisabled, nextIsDisabled, navigate, sx } = props;
  return (
    <Grid container sx={{ ...sx }} spacing={2}>
      <Grid item sm={6}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate('back')}
          disabled={backIsDisabled}
          tabIndex={6}
        >
          Previous
        </Button>
      </Grid>
      <Grid item sm={6}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate('next')}
          disabled={nextIsDisabled}
          tabIndex={7}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
}
