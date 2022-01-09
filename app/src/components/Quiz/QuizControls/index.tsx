import React from "react";
import { Stack, Grid, Button } from "@mui/material";

interface Props {
  backIsDisabled: boolean;
  nextIsDisabled: boolean;
  navigate: Function;
  isComplete: boolean;
  sx?: any;
}

export default function Choice(props: Props) {
  const { backIsDisabled, nextIsDisabled, navigate, isComplete, sx } = props;
  return (
    <Grid container sx={{ ...sx }} spacing={2}>
      <Grid item sm={6}>
        <Button
          fullWidth
          size="large"
          variant="outlined"
          onClick={() => navigate("back")}
          disabled={backIsDisabled}
          tabIndex={6}
        >
          Previous
        </Button>
      </Grid>
      <Grid item sm={6}>
        <Button
          fullWidth
          size="large"
          color={isComplete && nextIsDisabled ? "success" : "primary"}
          variant="contained"
          onClick={() =>
            isComplete && nextIsDisabled ? navigate("end") : navigate("next")
          }
          disabled={!!(nextIsDisabled && !isComplete)}
          tabIndex={7}
        >
          {isComplete && nextIsDisabled ? "See Result" : "Next"}
        </Button>
      </Grid>
    </Grid>
  );
}
