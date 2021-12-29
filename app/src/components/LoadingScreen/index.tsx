import React from 'react';
import { Grid } from '@mui/material';
import './loadingScreen.css';

export default function index() {
  return (
    <Grid container alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
      <Grid item>
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </Grid>
    </Grid>
  )
}
